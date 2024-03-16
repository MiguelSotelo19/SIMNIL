package mx.edu.utez.simnilback.controller.pozo.DTO;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.pozo.PozoBean;

@Data
@NoArgsConstructor
public class PozoDto {
    private Long idPozo;
    private String nombre;
    private Double capacidadLitros;
    private int porcentajeAgua;
    private Double profundidad;
    private Boolean estatus;

    public PozoBean toEntity(){
        return new PozoBean(nombre, capacidadLitros, porcentajeAgua, profundidad, estatus);
    }

    public PozoBean toUpdate(Long idPozo){
        return new PozoBean(idPozo, nombre, capacidadLitros, porcentajeAgua, profundidad, estatus);
    }
}
