import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieRepo movieRepo;
    @GetMapping
    public List<Movie> list() { return movieRepo.findAll(); }
    @PostMapping
    public Movie create(@RequestBody @Valid Movie m) { return movieRepo.save(m); }
}

@RestController
@RequestMapping("/api/showtimes")
@RequiredArgsConstructor
public class ShowtimeController {
    private final ShowtimeRepo showtimeRepo;
    @GetMapping("/{movieId}")
    public List<Showtime> upcoming(@PathVariable String movieId) {
        return showtimeRepo.findByMovieIdAndStartAtAfter(movieId, Instant.now());
    }
}

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private final SeatLockService lockService;
    private final ReservationService reservationService;

    @PostMapping("/lock")
    public ResponseEntity<?> lock(@RequestBody @Valid LockSeatRequest req,
                                  @AuthenticationPrincipal(expression = "id") String userId) {
        var ok = lockService.tryLock(userId, req.showtimeId(), req.seatKey(), Duration.ofSeconds(req.holdSeconds()));
        return ok ? ResponseEntity.ok().build() : ResponseEntity.status(409).body("Seat already locked");
    }

    @PostMapping("/confirm")
    public Reservation confirm(@RequestBody @Valid ConfirmReservationRequest req,
                               @AuthenticationPrincipal(expression = "id") String userId) {
        return reservationService.confirm(userId, req.showtimeId(), req.seatKey());
    }
}