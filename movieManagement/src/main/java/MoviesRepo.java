import com.NxP.moviemanagement.domain.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface MoviesRepo extends MongoRepository<Movie, String> {
    Optional<Movie> findByTitle(String title);
}

public interface TheaterRepo extends MongoRepository<Theater, String> {}

public interface ScreenRepo extends MongoRepository<Screen, String> {
    List<Screen> findByTheaterId(String theaterId);
}

public interface ShowtimeRepo extends MongoRepository<Showtime, String> {
    List<Showtime> findByMovieIdAndStartAtAfter(String movieId, Instant after);
    List<Showtime> findByScreenIdAndStartAtBetween(String screenId, Instant from, Instant to);
}

public interface SeatLockRepo extends MongoRepository<SeatLock, String> {
    Optional<SeatLock> findByShowtimeIdAndSeatKey(String showtimeId, String seatKey);
    long deleteByShowtimeIdAndSeatKey(String showtimeId, String seatKey);
}

public interface ReservationRepo extends MongoRepository<Reservation, String> {
    boolean existsByShowtimeIdAndSeatKey(String showtimeId, String seatKey);
    List<Reservation> findByShowtimeId(String showtimeId);
}

public interface UserRepo extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
}