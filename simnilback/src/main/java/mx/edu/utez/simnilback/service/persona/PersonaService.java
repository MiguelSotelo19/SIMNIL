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

    //Consultar personasa
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

        if (personaBean.getNombre() == null || personaBean.getNombre().isEmpty() || personaBean.getNombre().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre es obligatorio y no puede estar vacío."), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getApellidoPaterno() == null || personaBean.getApellidoPaterno().isEmpty() || personaBean.getApellidoPaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Paterno es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getApellidoMaterno() == null || personaBean.getApellidoMaterno().isEmpty() || personaBean.getApellidoMaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Materno es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getCorreo() == null || personaBean.getCorreo().isEmpty() || personaBean.getCorreo().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El correo es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getNombreUsuario() == null || personaBean.getNombreUsuario().isEmpty() || personaBean.getNombreUsuario().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre de usuario es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getContrasenia() == null || personaBean.getContrasenia().isEmpty() || personaBean.getContrasenia().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "La contraseña es obligatorio y no puede estar vacia"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getNumeroTelefonico() == null || personaBean.getNumeroTelefonico().isEmpty() || personaBean.getNumeroTelefonico().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El numero telefonico es obligatorio y no puede estar vacio"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getEstatus() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El estatus es requerido"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getRolBean() == null || personaBean.getRolBean().getIdRol() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol valido"), HttpStatus.BAD_REQUEST);
        }

        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getIdRol());
        if (!foundRol.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setRolBean(foundRol.get());

        Optional<PersonaBean> foundPersona = repository.findByNumeroTelefonico(personaBean.getNumeroTelefonico());
        if (foundPersona.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Ya existe una persona registrada con el mismo numero telefonico"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(personaBean), HttpStatus.OK, "Se registro correctamente la persona"), HttpStatus.OK);
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

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> recuperarPassword(String nombreUsuario, String nuevaContrasenia) {
        Optional<PersonaBean> foundPersona = repository.findByNombreUsuario(nombreUsuario);

        if (foundPersona.isPresent()) {
            PersonaBean persona = foundPersona.get();
            persona.setContrasenia(nuevaContrasenia);
            repository.save(persona);

            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Contraseña actualizada correctamente"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado"), HttpStatus.NOT_FOUND);
        }
    }



//    @Transactional(rollbackFor = {SQLException.class})
//    public ResponseEntity<ApiResponse> login(PersonaBean personaBean) {
//        Optional<PersonaBean> foundPersona = repository.findByNombreUsuario(personaBean.getNombreUsuario());
//        if (foundPersona.isPresent()) {
//            PersonaBean persona = foundPersona.get();
//            if (persona.getContrasenia().equals(personaBean.getContrasenia())) {
//                return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Bienvenido!"), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Usuario y/o contraseña incorrectos"), HttpStatus.UNAUTHORIZED);
//            }
//        } else {
//            return new ResponseEntity<>(new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Usuario y/o contraseña incorrectos"), HttpStatus.UNAUTHORIZED);
//        }
//    }






}
