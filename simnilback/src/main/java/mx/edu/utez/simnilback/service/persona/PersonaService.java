package mx.edu.utez.simnilback.service.persona;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.comunidad.ComunidadBean;
import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.persona.PersonaRepository;
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
public class PersonaService {

    private final PersonaRepository repository;
    private final RolRepository rolRepository;

    //Consultar personas
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(),
                HttpStatus.OK, "Todo bien"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getPersona(Long id){
        return new ResponseEntity<>(new ApiResponse(repository.findById(id),
                HttpStatus.OK, "Todo bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PersonaBean personaBean) {
        Optional<PersonaBean> foundPersona = repository.findByNumeroTelefonico(personaBean.getNumeroTelefonico());
        if (foundPersona.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Persona ya existente"), HttpStatus.BAD_REQUEST);
        if (personaBean.getRolBean() == null || personaBean.getRolBean().getIdRol() == null)
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);
        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getIdRol());
        if (!foundRol.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setRolBean(foundRol.get());
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(personaBean), HttpStatus.OK, "Se registró correctamente la persona"), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PersonaBean updatePersona) {
        if (updatePersona.getRolBean() == null || updatePersona.getRolBean().getIdRol() == null)
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);
        Optional <RolBean> foundRol = rolRepository.findById(updatePersona.getRolBean().getIdRol());
        if (foundRol.isEmpty())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        Optional<PersonaBean> existingPersonOptional = repository.findById(updatePersona.getIdPersonas());
        if (existingPersonOptional.isPresent())
            updatePersona.setRolBean(foundRol.get());
            return new ResponseEntity<>(new ApiResponse(repository.save(updatePersona), HttpStatus.OK, "Persona actualizada exitosamente"), HttpStatus.OK);
    }

    //Eliminar Persona

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changeStatus(Long id){
        Optional<PersonaBean> personaFound = repository.findById(id);
        if (personaFound.isPresent()){
            PersonaBean PersonaToDisable = personaFound.get();
            if(PersonaToDisable.getEstatus() == false){
                PersonaToDisable.setEstatus(true);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se Habilitó correctamente"), HttpStatus.OK);
            } else {
                PersonaToDisable.setEstatus(false);
                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Se deshabilitó correctamente"), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se pudo deshabilitar"), HttpStatus.BAD_REQUEST);
        }


    }



}
