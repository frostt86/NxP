import React from 'react';
import { Search, Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { Movie, PageType } from '../types';
import { movies } from '../data/mockData';

interface LandingProps {
  onNavigate: (page: PageType) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-20"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Cinema Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Experience
            <span className="block text-yellow-500">Cinema Redefined</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the latest blockbusters with premium comfort, 
            cutting-edge technology, and an unforgettable movie experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => onNavigate('movies')}
              className="group px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Book Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black text-white font-semibold rounded-lg text-lg transition-all duration-300">
              Watch Trailer
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Now <span className="text-yellow-500">Playing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't miss out on these spectacular movies currently showing in our theaters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-gray-800 transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2 text-white">{movie.title}</h3>
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{movie.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{movie.duration}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate('movies')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Reserve Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('movies')}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>View All Movies</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Choose <span className="text-yellow-500">CinemaX</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-400">Book your favorite seats in just a few clicks with our streamlined reservation system.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Experience</h3>
              <p className="text-gray-400">Enjoy state-of-the-art sound systems, comfortable seating, and crystal-clear projection.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Showtimes</h3>
              <p className="text-gray-400">Choose from multiple showtimes throughout the day to fit your perfect schedule.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}