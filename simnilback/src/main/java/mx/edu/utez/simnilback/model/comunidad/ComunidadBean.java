package mx.edu.utez.simnilback.model.comunidad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.simnilback.model.pozo.PozoBean;

import java.util.Set;

@Entity
@Table(name = "comunidades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComunidadBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComunidad;

    @Column(length = 150, nullable = false)
    private String nombre;

    @Column(length = 5, nullable = false)
    private String codigo_postal;

    @Column(length = 50, nullable = false)
    private String municipio;
    
    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private Boolean estatus;

    /*@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private PozoBean pozoAbastecedor;*/

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_pozo")
    private PozoBean pozoBean;

    public ComunidadBean(Long idComunidad, String nombre, String codigo_postal, String municipio, Boolean estatus) {
        this.idComunidad = idComunidad;
        this.nombre = nombre;
        this.codigo_postal = codigo_postal;
        this.municipio = municipio;
        this.estatus = estatus;
    }

    public ComunidadBean(String nombre, String codigo_postal, String municipio, Boolean estatus) {
        this.nombre = nombre;
        this.codigo_postal = codigo_postal;
        this.municipio = municipio;
        this.estatus = estatus;
    }

    /*public ComunidadBean(Long idComunidad, String nombre, String codigo_postal, String municipio, Boolean estatus, PozoBean pozoBean) {
        this.idComunidad = idComunidad;
        this.nombre = nombre;
        this.codigo_postal = codigo_postal;
        this.municipio = municipio;
        this.estatus = estatus;
        this.pozoBean = pozoBean;
    }*/

    public ComunidadBean(String nombre, String codigo_postal, String municipio, Boolean estatus, PozoBean pozoBean) {
        this.nombre = nombre;
        this.codigo_postal = codigo_postal;
        this.municipio = municipio;
        this.estatus = estatus;
        this.pozoBean = pozoBean;
    }
}
