import React from 'react';
import { Calendar, Clock, MapPin, Users, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Movie, Seat, Reservation, PageType } from '../types';

interface ReservationSummaryProps {
  selectedMovie: Movie | null;
  selectedShowtime: string;
  selectedSeats: Seat[];
  onNavigate: (page: PageType) => void;
}

export default function ReservationSummary({ 
  selectedMovie, 
  selectedShowtime, 
  selectedSeats, 
  onNavigate 
}: ReservationSummaryProps) {
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  if (!selectedMovie || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No reservation details found</p>
          <button
            onClick={() => onNavigate('movies')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + selectedMovie.price + (seat.type === 'premium' ? 5 : 0);
  }, 0);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-6">
            Your tickets have been reserved. Check your email for confirmation details.
          </p>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
            <h3 className="font-semibold mb-2">Booking Reference</h3>
            <p className="text-yellow-500 text-xl font-mono">CX{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          </div>
          <button
            onClick={() => onNavigate('landing')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('showtime')}
          className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Seat Selection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">Booking Summary</h2>
              
              {/* Movie Info */}
              <div className="flex space-x-4 mb-6">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{selectedMovie.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Today, {selectedShowtime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedMovie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>CinemaX Theater 1, Screen A</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seats */}
              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">Selected Seats</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="px-3 py-1 bg-yellow-500 text-black text-sm font-medium rounded-full"
                    >
                      {seat.row}{seat.number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-700 pt-6 mt-6">
                <div className="space-y-3">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span>Seat {seat.row}{seat.number} ({seat.type})</span>
                      <span>${selectedMovie.price + (seat.type === 'premium' ? 5 : 0)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-yellow-500">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">Payment Details</h2>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-yellow-500"
                    />
                    <CreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                isProcessing
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black transform hover:scale-105'
              }`}
            >
              {isProcessing ? 'Processing...' : `Confirm Payment - $${totalPrice}`}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Your payment information is secure and encrypted. 
              By completing this purchase, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}