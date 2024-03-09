package mx.edu.utez.simnilback.controller.persona.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.rol.RolBean;

@Data
@NoArgsConstructor
public class PersonaDto {
    private Long idPersonas;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String correo;
    private String nombreUsuario;
    private String contrasenia;
    private Boolean estatus;
    private String numeroTelefonico;
    private RolBean rolBean;


    public PersonaBean toEntity(){
        if (rolBean == null)
            return new PersonaBean(nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, contrasenia, estatus, numeroTelefonico);
        return new PersonaBean(nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, contrasenia, estatus, numeroTelefonico, rolBean);

    }

    //Actualizar
    public PersonaBean toUpdate(Long idPersona) {
        return new PersonaBean(idPersona, nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, contrasenia, estatus, numeroTelefonico, rolBean);
    }
}
