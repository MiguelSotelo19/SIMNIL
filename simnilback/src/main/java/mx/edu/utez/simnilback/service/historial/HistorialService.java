package mx.edu.utez.simnilback.service.historial;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.historial.HistorialBean;
import mx.edu.utez.simnilback.model.historial.HistorialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class HistorialService {
    private final HistorialRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Se obtuvieron correctamente todos los Registros de Historial"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id), HttpStatus.OK, "Se encontro el Registro con el Id dado"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(HistorialBean historialBean){
        Optional<HistorialBean> foundHistorial = repository.findById(historialBean.getIdHistorial());
        if (foundHistorial.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error al intentar registrar el Historial"), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(historialBean), HttpStatus.OK, "Registrado Correctamente"), HttpStatus.OK);
    }
}
