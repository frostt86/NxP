import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Duration;
import java.util.List;

@Document("movies")
public class Movie {
    @Id private String id;
    @Indexed(unique = true) private String title;
    private String description;
    private List<String> genres;
    private Duration duration; // or minutes as int
    private String posterUrl;
    // getters/setters
}