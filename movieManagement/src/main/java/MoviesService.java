import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class SeatLockService {
    private final SeatLockRepo seatLockRepo;

    // try lock: creates a doc with TTL; unique idx guarantees single lock
    public boolean tryLock(String userId, String showtimeId, String seatKey, Duration hold) {
        var lock = new SeatLock();
        lock.setUserId(userId);
        lock.setShowtimeId(showtimeId);
        lock.setSeatKey(seatKey);
        lock.setExpiresAt(Instant.now().plus(hold));
        try {
            seatLockRepo.insert(lock);
            return true;
        } catch (DuplicateKeyException e) {
            return false; // already locked
        }
    }

    public void release(String showtimeId, String seatKey) {
        seatLockRepo.deleteByShowtimeIdAndSeatKey(showtimeId, seatKey);
    }

    public boolean isLocked(String showtimeId, String seatKey) {
        return seatLockRepo.findByShowtimeIdAndSeatKey(showtimeId, seatKey).isPresent();
    }
}