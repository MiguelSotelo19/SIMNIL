package mx.edu.utez.simnilback.controller.comunidad.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;

@Data
@NoArgsConstructor
public class ComunidadDto { private Long idComunidad;
    private String nombre;
    private String codigo_postal;
    private String municipio;
    private Boolean estatus;

    public ComunidadBean toEntity(){
        return new ComunidadBean(idComunidad, nombre, codigo_postal, municipio, estatus) ;
    }

    public ComunidadBean toUpdate(){
        return new ComunidadBean(idComunidad, nombre, codigo_postal, municipio, estatus);
    }
}
