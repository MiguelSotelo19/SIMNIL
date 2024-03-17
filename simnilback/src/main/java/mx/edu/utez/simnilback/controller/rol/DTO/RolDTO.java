package mx.edu.utez.simnilback.controller.rol.DTO;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.rol.RolBean;

@Data
@NoArgsConstructor
public class RolDTO {
    private Long idRol;

    private String rol;

    public RolBean toUpdate(){
        return new RolBean(idRol, rol);
    }

    public RolBean toEntity(){
        return new RolBean(rol);
    }
}
