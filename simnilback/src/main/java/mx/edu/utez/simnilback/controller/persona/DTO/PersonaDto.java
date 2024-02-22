package mx.edu.utez.simnilback.controller.persona.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.persona.PersonaBean;

@Data
@NoArgsConstructor
public class PersonaDto {
   private Long idPersona ;
    private String nombre ;
    private String apellido_materno;
    private String apellido_paterno;
    private String numero_telefonico;
    private String correo_electronico ;
    private String nombre_usuario;
    private String contrasenia;
    private Boolean estatus;

    public PersonaBean toEntity(){
        return new PersonaBean(nombre, apellido_materno, apellido_paterno, correo_electronico, nombre_usuario, contrasenia, estatus, numero_telefonico);
    }

    //Actualizar
    public PersonaBean toUpdate() {
        return  new PersonaBean(idPersona,nombre,apellido_materno, apellido_paterno,correo_electronico, nombre_usuario, contrasenia, estatus,numero_telefonico);
    }
}
