import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "produkte")
public class produkte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = false)
    @NotBlank(message = "Der Wert darf nicht leer sein")
    private String name;

    @Column(name = "preis", nullable = false, unique = false)
    @Min(value = 0, message = "Der Wert muss mindestens 0 sein")
    private int preis;

    @Column(name = "anzahl", nullable = false, unique = false)
    @Min(value = 0, message = "Der Wert muss mindestens 0 sein")
    private int anzahl;

    // Standardkonstruktor
    public produkte() {
    }

    // Konstruktor mit Parametern
    public produkte(String name, int anzahl, int preis) {
        this.name = name;
        this.anzahl = anzahl;
        this.preis = preis;
    }

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPreis() {
        return this.preis;
    }

    public void setPreis(int preis) {
        this.preis = preis;
    }

    public int getAnzahl() {
        return anzahl;
    }

    public void setAnzahl(int anzahl) {
        this.anzahl = anzahl;
    }
}
