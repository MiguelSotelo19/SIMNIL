package mx.edu.utez.simnilback.service.rol;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.rol.RolBean;
import mx.edu.utez.simnilback.model.rol.RolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class RolService {
    private final RolRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse>findAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Acción realizada con exito!"), HttpStatus.OK);
    }

    //consulta especifica por nombre del rol :), despues vemos cual se adapta mejor al proyecto. oki?
  /* @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> finOne(String rol){
        Optional<RolBean> foundRol = repository.findByRol(rol);

        if(foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(foundRol.get(), HttpStatus.OK, "Rol encontrado!"),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Rol no encontrado"), HttpStatus.NOT_FOUND);
        }
    }*/

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> finOneId(Long idRol){
        Optional<RolBean> foundRol = repository.findById(idRol);

        if(foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(foundRol.get(), HttpStatus.OK, "Rol encontrado!"),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Rol no encontrado"), HttpStatus.NOT_FOUND);
        }
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(RolBean rolBean){

        if(rolBean.getRol() == null || rolBean.getRol().isEmpty() || rolBean.getRol().isBlank()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre del rol es requerido"), HttpStatus.BAD_REQUEST);
        }

        Optional<RolBean> foundRol = repository.findByRol(rolBean.getRol());

        if (foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Rol duplicado"), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(rolBean), HttpStatus.OK, "Registrado exitosamente!"), HttpStatus.OK);
        }
    }


    //este es opcional, pero por si las dudas aksdlakdjlasd
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(RolBean updateRol){

        if(updateRol.getRol() == null || updateRol.getRol().isEmpty() || updateRol.getRol().isBlank()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre del rol es requerido"), HttpStatus.BAD_REQUEST);
        }

        Optional<RolBean> foundRol= repository.findById(updateRol.getIdRol());
        if (foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(repository.save(updateRol), HttpStatus.OK, "Actualización exitosa!"), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "No encontrado"), HttpStatus.NOT_FOUND);
        }
    }

//    @Transactional(rollbackFor = {SQLException.class})
//    public ResponseEntity<ApiResponse> changeStatus(Long id){
//        Optional<RolBean> foundRol=repository.findById(id);
//
//        if(foundRol.isPresent()){
//            RolBean rolDisabled = foundRol.get();
//            if (rolDisabled.getRol())
//        }
//    }
}
