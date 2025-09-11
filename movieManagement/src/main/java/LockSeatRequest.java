// dto/LockSeatRequest.java
public record LockSeatRequest(String showtimeId, String seatKey, long holdSeconds) {}
