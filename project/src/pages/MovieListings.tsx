import React from 'react';
import { Star, Clock, Calendar, Filter } from 'lucide-react';
import { Movie, PageType } from '../types';
import { movies } from '../data/mockData';

interface MovieListingsProps {
  onNavigate: (page: PageType) => void;
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieListings({ onNavigate, onSelectMovie }: MovieListingsProps) {
  const [selectedGenre, setSelectedGenre] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('rating');

  const genres = ['All', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];

  const filteredMovies = movies
    .filter(movie => selectedGenre === 'All' || movie.genre.includes(selectedGenre))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleSelectMovie = (movie: Movie) => {
    onSelectMovie(movie);
    onNavigate('showtime');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Current <span className="text-yellow-500">Movies</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover and reserve tickets for the latest blockbusters and acclaimed films
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-yellow-500" />
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedGenre === genre
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              {/* Poster */}
              <div className="relative overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-white">{movie.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors duration-200">
                  {movie.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <span className="text-yellow-500 font-semibold">${movie.price}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.description}</p>

                {/* Showtimes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Today's Shows</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.slice(0, 3).map((time) => (
                      <span
                        key={time}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded border border-gray-600"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={() => handleSelectMovie(movie)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Reserve Seats
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No movies found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}