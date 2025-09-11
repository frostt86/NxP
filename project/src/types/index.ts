export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  duration: string;
  poster: string;
  description: string;
  showtimes: string[];
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  type: 'regular' | 'premium';
}

export interface Reservation {
  movieId: string;
  movieTitle: string;
  showtime: string;
  seats: Seat[];
  totalPrice: number;
  theater: string;
}

export type PageType = 'landing' | 'movies' | 'showtime' | 'checkout' | 'login' | 'signup';