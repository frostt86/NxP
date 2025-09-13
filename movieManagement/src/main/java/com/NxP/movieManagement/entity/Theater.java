package main.java.com.nxp.movieManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Theater {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long theaterId;

    private String name;
    private String location;
    private int capacity;

    @OneToMany(mappedBy = "theater", cascade = CascadeType.ALL)
    private List<Showtime> showtimes;
}
