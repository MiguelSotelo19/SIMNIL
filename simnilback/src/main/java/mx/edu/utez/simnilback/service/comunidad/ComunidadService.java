package mx.edu.utez.simnilback.service.comunidad;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;
import mx.edu.utez.simnilback.model.comunidad.ComunidadRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ComunidadService {
    private final ComunidadRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Se obtuvieron correctamente todos los Registros de Comunidades"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id), HttpStatus.OK, "Se encontro el Registro con el Id dado"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(ComunidadBean comunidadesBean){
        Optional<ComunidadBean> foundComunidad = repository.findById(comunidadesBean.getIdComunidad());
        if (foundComunidad.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error al intentar registrar la Comunidad"), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(comunidadesBean), HttpStatus.OK, "Registrado Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(ComunidadBean comunidadesBean){
        Optional<ComunidadBean> foundComunidad = repository.findById(comunidadesBean.getIdComunidad());
        if (foundComunidad.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.save(comunidadesBean), HttpStatus.OK, "Se ha actualizado Correctamente la Comunidad"), HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se ha encontrado la Comunidad con esos Datos"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete(Long id){
        Optional<ComunidadBean> comunidadesOptional = repository.findById(id);
        if (comunidadesOptional.isPresent()){
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se ha eliminado Correctamente la Comunidad"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se ha podido eliminar la Comunidad dada"), HttpStatus.BAD_REQUEST);
        }
    }
}
