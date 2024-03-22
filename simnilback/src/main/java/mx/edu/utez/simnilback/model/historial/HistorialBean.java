package mx.edu.utez.simnilback.model.historial;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.simnilback.model.pozo.PozoBean;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "HISTORIAL")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistorialBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHistorial;

    @Column(nullable = false)
    private Double nivelAgua;

    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate fechaRecopilacion;

    @Column(columnDefinition = "TIME", nullable = false)
    private LocalTime horaRecopilacion;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_pozo")
    private PozoBean pozoBean;


    public HistorialBean(Double nivelAgua, LocalDate fechaRecopilacion, LocalTime horaRecopilacion) {
        this.nivelAgua = nivelAgua;
        this.fechaRecopilacion = fechaRecopilacion;
        this.horaRecopilacion = horaRecopilacion;
    }

    public HistorialBean(Double nivelAgua, LocalDate fechaRecopilacion, LocalTime horaRecopilacion, PozoBean pozoBean) {
        this.nivelAgua = nivelAgua;
        this.fechaRecopilacion = fechaRecopilacion;
        this.horaRecopilacion = horaRecopilacion;
        this.pozoBean = pozoBean;
    }
}
