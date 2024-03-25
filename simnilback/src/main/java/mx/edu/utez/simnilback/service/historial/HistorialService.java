package mx.edu.utez.simnilback.service.historial;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.historial.HistorialBean;
import mx.edu.utez.simnilback.model.historial.HistorialRepository;
import mx.edu.utez.simnilback.model.pozo.PozoBean;
import mx.edu.utez.simnilback.model.pozo.PozoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class HistorialService {
    private final HistorialRepository repository;
    private final PozoRepository pozoRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Se obtuvieron correctamente todos los Registros de Historial"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id), HttpStatus.OK, "Se encontro el Registro con el Id dado"), HttpStatus.OK);
    }

    /*@Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(HistorialBean historialBean){
        Optional<HistorialBean> foundHistorial = repository.findByHoraRecopilacionAndFechaRecopilacionAndPozoBean_IdPozo(historialBean.getHoraRecopilacion(), historialBean.getFechaRecopilacion(), historialBean.getPozoBean().getIdPozo());
        if (foundHistorial.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error al intentar registrar el Historial"), HttpStatus.BAD_REQUEST);
        }

        if (historialBean.getPozoBean() == null || historialBean.getPozoBean().getIdPozo() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un pozo existente"), HttpStatus.BAD_REQUEST);
        }
        Optional<PozoBean> foundIdPozo = pozoRepository.findById(historialBean.getPozoBean().getIdPozo());
        if (!foundIdPozo.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El Pozo proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        historialBean.setPozoBean(foundIdPozo.get());

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(historialBean), HttpStatus.OK, "Registrado Correctamente"), HttpStatus.OK);
    }*/

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(Double nivelAgua, PozoBean idPozo){
        Optional<PozoBean> foundIdPozo = pozoRepository.findById(idPozo.getIdPozo());
        if (!foundIdPozo.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El Pozo proporcionado no existe"), HttpStatus.BAD_REQUEST);
        } else {
            ZoneId zonaHoraria = ZoneId.of("America/Mexico_City");
            ZonedDateTime horaFechaActual = ZonedDateTime.now(zonaHoraria);

            LocalTime horaLocal = horaFechaActual.toLocalTime();
            LocalDate fechaLocal = horaFechaActual.toLocalDate();

            if (nivelAgua <= 0 || nivelAgua == null || nivelAgua.isNaN()){
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se envio Nivel Agua"), HttpStatus.BAD_REQUEST);
            } else {
                HistorialBean historialBean = new HistorialBean(nivelAgua, fechaLocal, horaLocal, idPozo);
                return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(historialBean), HttpStatus.OK, "Registrado Correctamente"), HttpStatus.OK);
            }
        }
    }

    /* if (comunidadBean.getPozoBean() == null || comunidadBean.getPozoBean().getIdPozo() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un pozo existente"), HttpStatus.BAD_REQUEST);
        }
        Optional<PozoBean> foundIdPozo = pozoRepository.findById(comunidadBean.getPozoBean().getIdPozo());
        if (!foundIdPozo.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El Pozo proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        comunidadBean.setPozoBean(foundIdPozo.get());*/
}
