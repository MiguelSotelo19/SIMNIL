package mx.edu.utez.simnilback.service.comunidad;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;
import mx.edu.utez.simnilback.model.comunidad.ComunidadRepository;
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
public class ComunidadService {
    private final ComunidadRepository repository;
    private  final PozoRepository pozoRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Se obtuvieron correctamente todos los Registros de Comunidades"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOne(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id), HttpStatus.OK, "Se encontro el Registro con el Id dado"), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(mx.edu.utez.simnilback.model.comunidad.ComunidadBean comunidadBean) {
        if (comunidadBean.getNombre() == null || comunidadBean.getNombre().isEmpty() || comunidadBean.getNombre().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre de la comunidad es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (comunidadBean.getCodigo_postal() == null || comunidadBean.getCodigo_postal().isEmpty() || comunidadBean.getCodigo_postal().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El codigo postal es obligatorio y no puede estar vacio."), HttpStatus.BAD_REQUEST);
        }

        if (comunidadBean.getMunicipio() == null || comunidadBean.getMunicipio().isEmpty() || comunidadBean.getMunicipio().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El municipio es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (comunidadBean.getEstatus() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El estatus es requerido."), HttpStatus.BAD_REQUEST);
        }

        Optional<mx.edu.utez.simnilback.model.comunidad.ComunidadBean> foundComunidad = repository.findByNombre(comunidadBean.getNombre());
        if (foundComunidad.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Comunidad ya existente"), HttpStatus.BAD_REQUEST);
        }

        if (comunidadBean.getPozoBean() == null || comunidadBean.getPozoBean().getIdPozo() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un pozo existente"), HttpStatus.BAD_REQUEST);
        }
        Optional<PozoBean> foundIdPozo = pozoRepository.findById(comunidadBean.getPozoBean().getIdPozo());
        if (!foundIdPozo.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El Pozo proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        comunidadBean.setPozoBean(foundIdPozo.get());

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(comunidadBean), HttpStatus.OK, "Se registró correctamente la Comunidad"), HttpStatus.OK);
    }




//    @Transactional(rollbackFor = {SQLException.class})
//    public ResponseEntity<ApiResponse> update(ComunidadBean comunidadesBean){
//        Optional<ComunidadBean> foundComunidad = repository.findById(comunidadesBean.getIdComunidad());
//        if (foundComunidad.isPresent())
//            return new ResponseEntity<>(new ApiResponse(repository.save(comunidadesBean), HttpStatus.OK, "Se ha actualizado Correctamente la Comunidad"), HttpStatus.OK);
//        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se ha encontrado la Comunidad con esos Datos"), HttpStatus.BAD_REQUEST);
//    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(ComunidadBean updateComunidad) {
        if (updateComunidad.getPozoBean() == null || updateComunidad.getPozoBean().getIdPozo() == null)
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un Pozo válido"), HttpStatus.BAD_REQUEST);
        Optional <PozoBean> foundPozo = pozoRepository.findById(updateComunidad.getPozoBean().getIdPozo());
        if (foundPozo.isEmpty())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El Pozo proporcionado no existe"), HttpStatus.BAD_REQUEST);
        Optional<ComunidadBean> existingComunidadOptional = repository.findById(updateComunidad.getIdComunidad());
        if (existingComunidadOptional.isPresent())
            updateComunidad.setPozoBean(foundPozo.get());
        return new ResponseEntity<>(new ApiResponse(repository.save(updateComunidad), HttpStatus.OK, "Comunidad actualizada exitosamente"), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changeStatus(Long id){
        Optional<ComunidadBean> comunidadFound = repository.findById(id);
        if (comunidadFound.isPresent()){
            ComunidadBean comunidadToDisable = comunidadFound.get();
            if(comunidadToDisable.getEstatus() == false){
                comunidadToDisable.setEstatus(true);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se Habilitó correctamente"), HttpStatus.OK);
            } else {
                comunidadToDisable.setEstatus(false);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se deshabilitó correctamente"), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se pudo deshabilitar"), HttpStatus.BAD_REQUEST);
        }


    }
}
