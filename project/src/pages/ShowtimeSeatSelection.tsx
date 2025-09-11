import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Movie, Seat, PageType } from '../types';
import { generateSeats } from '../data/mockData';

interface ShowtimeSeatSelectionProps {
  selectedMovie: Movie | null;
  onNavigate: (page: PageType) => void;
  onConfirmSelection: (movie: Movie, showtime: string, seats: Seat[]) => void;
}

export default function ShowtimeSeatSelection({ 
  selectedMovie, 
  onNavigate, 
  onConfirmSelection 
}: ShowtimeSeatSelectionProps) {
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  const [seats, setSeats] = React.useState<{ [key: string]: Seat[] }>(generateSeats());
  const [selectedSeats, setSelectedSeats] = React.useState<Seat[]>([]);

  React.useEffect(() => {
    if (selectedMovie?.showtimes.length) {
      setSelectedShowtime(selectedMovie.showtimes[0]);
    }
  }, [selectedMovie]);

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No movie selected</p>
          <button
            onClick={() => onNavigate('movies')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Select a Movie
          </button>
        </div>
      </div>
    );
  }

  const toggleSeat = (rowKey: string, seatIndex: number) => {
    const seat = seats[rowKey][seatIndex];
    if (!seat.isAvailable) return;

    setSeats(prev => {
      const newSeats = { ...prev };
      newSeats[rowKey] = [...newSeats[rowKey]];
      newSeats[rowKey][seatIndex] = {
        ...seat,
        isSelected: !seat.isSelected
      };
      return newSeats;
    });

    setSelectedSeats(prev => {
      const seatId = `${rowKey}${seat.number}`;
      const isCurrentlySelected = prev.find(s => s.id === seatId);
      
      if (isCurrentlySelected) {
        return prev.filter(s => s.id !== seatId);
      } else {
        return [...prev, { ...seat, isSelected: true }];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0 && selectedShowtime) {
      onConfirmSelection(selectedMovie, selectedShowtime, selectedSeats);
      onNavigate('checkout');
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + selectedMovie.price + (seat.type === 'premium' ? 5 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Movie Info */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => onNavigate('movies')}
            className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Movies</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Movie Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMovie.genre.map((g) => (
                  <span key={g} className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                    {g}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedMovie.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Theater 1, Screen A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Showtimes & Seat Selection */}
          <div className="lg:col-span-2">
            {/* Showtime Selection */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">Select Showtime</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedMovie.showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={`p-3 rounded-lg border transition-colors duration-200 ${
                      selectedShowtime === time
                        ? 'bg-yellow-500 text-black border-yellow-500'
                        : 'bg-gray-700 text-white border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Map */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Select Your Seats</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Taken</span>
                  </div>
                </div>
              </div>

              {/* Screen */}
              <div className="w-full h-2 bg-gradient-to-r from-gray-600 via-white to-gray-600 rounded-full mb-8 relative">
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                  SCREEN
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-3">
                {Object.entries(seats).map(([row, rowSeats]) => (
                  <div key={row} className="flex items-center justify-center space-x-2">
                    <div className="w-6 text-center text-sm font-medium text-gray-400">{row}</div>
                    <div className="flex space-x-2">
                      {rowSeats.map((seat, index) => (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(row, index)}
                          disabled={!seat.isAvailable}
                          className={`w-8 h-8 rounded-t-lg border-b-2 transition-all duration-200 text-xs font-medium ${
                            seat.isSelected
                              ? 'bg-yellow-500 border-yellow-600 text-black'
                              : !seat.isAvailable
                              ? 'bg-red-500 border-red-600 text-white cursor-not-allowed'
                              : seat.type === 'premium'
                              ? 'bg-gray-600 border-gray-700 text-white hover:bg-gray-500'
                              : 'bg-gray-600 border-gray-700 text-white hover:bg-gray-500'
                          }`}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                    <div className="w-6 text-center text-sm font-medium text-gray-400">{row}</div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                  <span>Rows A-C: Premium Seats (+$5)</span>
                  <span>Rows D-H: Regular Seats</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedSeats.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-semibold">
                    {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-gray-400">
                    {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-500">${totalPrice}</p>
                  <p className="text-sm text-gray-400">Total Amount</p>
                </div>
                <button
                  onClick={handleConfirm}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}