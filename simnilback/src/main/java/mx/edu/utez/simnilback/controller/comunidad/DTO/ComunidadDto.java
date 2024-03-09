package mx.edu.utez.simnilback.controller.comunidad.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;
import mx.edu.utez.simnilback.model.pozo.PozoBean;

@Data
@NoArgsConstructor
public class ComunidadDto {
    private Long idComunidad;
    private String nombre;
    private String codigo_postal;
    private String municipio;
    private Boolean estatus;
    private PozoBean pozoBean;

    public ComunidadBean toEntity(){
        return new ComunidadBean(nombre, codigo_postal, municipio, estatus) ;
    }

    public ComunidadBean toUpdate(Long idComunidad){
        return new ComunidadBean(idComunidad, nombre, codigo_postal, municipio, estatus);
    }
}
