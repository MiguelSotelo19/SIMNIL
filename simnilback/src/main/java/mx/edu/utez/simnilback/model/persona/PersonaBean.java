package mx.edu.utez.simnilback.model.persona;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.simnilback.model.pozo.PozoBean;
import mx.edu.utez.simnilback.model.rol.RolBean;

import java.util.Set;

@Entity
@Table(name = "PERSONAS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPersonas;
    @Column(length = 100, nullable = false)
    private String nombre;
    @Column(length = 100, nullable = false)
    private String apellidoPaterno;
    @Column(length = 100, nullable = false)
    private String apellidoMaterno;
    @Column(length = 100, nullable = false)
    private String correo;
    @Column(length = 100, nullable = false)
    private String nombreUsuario;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String contrasenia;
    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private Boolean estatus;
    @Column(length = 10, nullable = false)
    private String numeroTelefonico;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_id_rol")
    private RolBean rolBean;

    @ManyToMany(mappedBy = "personaBeanSet")
    Set<PozoBean> pozoBean;

    public PersonaBean(String nombre, String apellidoPaterno, String apellidoMaterno, String correo, String nombreUsuario, String contrasenia, Boolean estatus, String numeroTelefoncico) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.estatus = estatus;
        this.numeroTelefonico = numeroTelefoncico;
    }

    public PersonaBean(String nombre, String apellidoPaterno, String apellidoMaterno, String correo, String nombreUsuario, String contrasenia, Boolean estatus, String numeroTelefoncico, RolBean rolBean) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.estatus = estatus;
        this.numeroTelefonico = numeroTelefoncico;
        this.rolBean = rolBean;
    }

    public PersonaBean(Long idPersonas, String nombre, String apellidoPaterno, String apellidoMaterno, String correo, String nombreUsuario, String contrasenia, Boolean estatus, String numeroTelefonico, RolBean rolBean) {
        this.idPersonas = idPersonas;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.estatus = estatus;
        this.numeroTelefonico = numeroTelefonico;
        this.rolBean = rolBean;
    }
}
