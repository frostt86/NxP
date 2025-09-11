import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Quantum Odyssey',
    genre: ['Sci-Fi', 'Adventure'],
    rating: 8.7,
    duration: '2h 28m',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'An epic journey through space and time that challenges the boundaries of reality.',
    showtimes: ['14:30', '17:45', '21:00'],
    price: 15
  },
  {
    id: '2',
    title: 'Midnight Chronicles',
    genre: ['Thriller', 'Mystery'],
    rating: 9.1,
    duration: '1h 56m',
    poster: 'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A gripping thriller that unfolds in the shadows of a sleepless city.',
    showtimes: ['15:15', '18:30', '21:45'],
    price: 15
  },
  {
    id: '3',
    title: 'Digital Dreams',
    genre: ['Drama', 'Sci-Fi'],
    rating: 8.3,
    duration: '2h 14m',
    poster: 'https://images.pexels.com/photos/7991147/pexels-photo-7991147.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A thought-provoking exploration of consciousness in the digital age.',
    showtimes: ['16:00', '19:15', '22:30'],
    price: 15
  },
  {
    id: '4',
    title: 'Neon Nights',
    genre: ['Action', 'Crime'],
    rating: 8.8,
    duration: '2h 07m',
    poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'High-octane action set against the backdrop of a cyberpunk metropolis.',
    showtimes: ['14:45', '18:00', '21:15'],
    price: 18
  },
  {
    id: '5',
    title: 'Shadow Realm',
    genre: ['Horror', 'Supernatural'],
    rating: 7.9,
    duration: '1h 43m',
    poster: 'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A spine-chilling journey into the unknown where nightmares become reality.',
    showtimes: ['17:30', '20:00', '22:45'],
    price: 15
  },
  {
    id: '6',
    title: 'Cosmic Legacy',
    genre: ['Adventure', 'Fantasy'],
    rating: 8.5,
    duration: '2h 35m',
    poster: 'https://images.pexels.com/photos/7991148/pexels-photo-7991148.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'An epic tale of heroes and legends across multiple dimensions.',
    showtimes: ['13:30', '17:00', '20:30'],
    price: 18
  }
];

export const generateSeats = (): { [key: string]: Seat[] } => {
  const seats: { [key: string]: Seat[] } = {};
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(row => {
    seats[row] = [];
    for (let i = 1; i <= 12; i++) {
      seats[row].push({
        id: `${row}${i}`,
        row,
        number: i,
        isAvailable: Math.random() > 0.3, // 70% availability
        isSelected: false,
        type: ['A', 'B', 'C'].includes(row) ? 'premium' : 'regular'
      });
    }
  });
  
  return seats;
};