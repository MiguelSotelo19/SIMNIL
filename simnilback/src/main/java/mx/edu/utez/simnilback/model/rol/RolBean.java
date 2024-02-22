package mx.edu.utez.simnilback.model.rol;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.simnilback.model.persona.PersonaBean;

@Entity
@Table(name = "ROLES")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RolBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRol;

    @Column(length = 50)
    private String rol;

    @JsonIgnore
    @OneToOne(mappedBy = "rolBean", fetch = FetchType.LAZY)
    private PersonaBean usuarioBean;
}
