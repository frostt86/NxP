import React from 'react';
import { Movie, Seat, PageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import MovieListings from './pages/MovieListings';
import ShowtimeSeatSelection from './pages/ShowtimeSeatSelection';
import ReservationSummary from './pages/ReservationSummary';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = React.useState<PageType>('landing');
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  const [selectedSeats, setSelectedSeats] = React.useState<Seat[]>([]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleConfirmSelection = (movie: Movie, showtime: string, seats: Seat[]) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setSelectedSeats(seats);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'movies':
        return (
          <MovieListings 
            onNavigate={handleNavigate}
            onSelectMovie={handleSelectMovie}
          />
        );
      case 'showtime':
        return (
          <ShowtimeSeatSelection
            selectedMovie={selectedMovie}
            onNavigate={handleNavigate}
            onConfirmSelection={handleConfirmSelection}
          />
        );
      case 'checkout':
        return (
          <ReservationSummary
            selectedMovie={selectedMovie}
            selectedShowtime={selectedShowtime}
            selectedSeats={selectedSeats}
            onNavigate={handleNavigate}
          />
        );
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'signup':
        return <Signup onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  const showHeaderFooter = !['login', 'signup'].includes(currentPage);

  return (
    <div className="min-h-screen bg-black text-white">
      {showHeaderFooter && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <main className={showHeaderFooter ? '' : 'min-h-screen'}>
        {renderPage()}
      </main>
      
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;