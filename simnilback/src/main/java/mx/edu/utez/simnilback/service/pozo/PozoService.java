package mx.edu.utez.simnilback.service.pozo;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.pozo.PozoBean;
import mx.edu.utez.simnilback.model.pozo.PozoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PozoService {
    private final PozoRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Obtenidos Correstacmente"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id), HttpStatus.OK, "Se encontro correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PozoBean pozoBean){
        Optional<PozoBean> foundPozo = repository.findByNombre(pozoBean.getNombre());
        if (foundPozo.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error al Registrar el Pozo"), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(pozoBean), HttpStatus.OK, "Se registro Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PozoBean pozoBean){
        Optional<PozoBean> foundPozo = repository.findById(pozoBean.getIdPozo());
        if (foundPozo.isPresent())
            return  new ResponseEntity<>(new ApiResponse(repository.save(pozoBean), HttpStatus.OK, "Se actualizo correctamente"), HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No hay registro con esos datos"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changeStatus(Long id){
        Optional<PozoBean> pozoFound = repository.findById(id);
        if (pozoFound.isPresent()){
            PozoBean PozoToDisable = pozoFound.get();
            if(PozoToDisable.getEstatus() == false){
                PozoToDisable.setEstatus(true);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se Habilitó correctamente"), HttpStatus.OK);
            } else {
                PozoToDisable.setEstatus(false);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se deshabilitó correctamente"), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se pudo deshabilitar"), HttpStatus.BAD_REQUEST);
        }


    }
}