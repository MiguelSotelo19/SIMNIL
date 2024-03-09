package mx.edu.utez.simnilback.model.pozo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;
import mx.edu.utez.simnilback.model.historial.HistorialBean;
import mx.edu.utez.simnilback.model.persona.PersonaBean;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pozos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PozoBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPozo;

    @Column(length = 150, nullable = false)
    private String nombre;

    @Column(length = 8, nullable = false)
    private Double capacidadLitros;

    @Column(length = 4, nullable = false)
    private int porcentajeAgua;

    @Column(length = 10, nullable = false)
    private Double profundidad;

    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private Boolean estatus;


    @OneToMany(mappedBy = "pozoBean",fetch = FetchType.LAZY)
    private Set<ComunidadBean> comunidadesBeans;

    @ManyToMany
    @JoinTable(name="pozos_personas",joinColumns = @JoinColumn(name="fk_id_pozo"),
            inverseJoinColumns =@JoinColumn(name = "fk_id_persona") )
    Set <PersonaBean> personaBeanSet =new HashSet<>();

    @OneToMany(mappedBy = "pozoBean", fetch = FetchType.LAZY)
    private Set<HistorialBean> datosPozoBeans;

    public PozoBean(Long idPozo, String nombre, Double capacidadLitros, int porcentajeAgua, Double profundidad, Boolean estatus) {
        this.idPozo = idPozo;
        this.nombre = nombre;
        this.capacidadLitros = capacidadLitros;
        this.porcentajeAgua = porcentajeAgua;
        this.profundidad = profundidad;
        this.estatus = estatus;
    }

    public PozoBean(String nombre, Double capacidadLitros, int porcentajeAgua, Double profundidad, Boolean estatus) {
        this.nombre = nombre;
        this.capacidadLitros = capacidadLitros;
        this.porcentajeAgua = porcentajeAgua;
        this.profundidad = profundidad;
        this.estatus = estatus;
    }
}
