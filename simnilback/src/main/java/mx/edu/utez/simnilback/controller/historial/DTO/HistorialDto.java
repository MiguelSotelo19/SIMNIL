package mx.edu.utez.simnilback.controller.historial.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.simnilback.model.historial.HistorialBean;
import mx.edu.utez.simnilback.model.pozo.PozoBean;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@NoArgsConstructor
public class HistorialDto {

    private Long idHistorial;

    private Double nivelAgua;

    private LocalDate fechaRecopilacion;

    private LocalTime horaRecopilacion;

    private PozoBean pozoBean;

    public HistorialBean toEntity(){
        /*if(pozoBean==null)
            return  new HistorialBean(nivelAgua, fechaRecopilacion, horaRecopilacion);
        return new HistorialBean(nivelAgua, fechaRecopilacion, horaRecopilacion, pozoBean);*/
        return new HistorialBean(nivelAgua, fechaRecopilacion, horaRecopilacion, pozoBean);
    }
}
