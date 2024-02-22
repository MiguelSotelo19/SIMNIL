package mx.edu.utez.simnilback.service.persona;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.persona.PersonaRepository;
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

    //Crear un persona
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PersonaBean personaBean){

       Optional<PersonaBean> foundNumero = repository.findByNumeroTelefoncico(personaBean.getNumeroTelefoncico());
        Optional<PersonaBean> foundCorreo = repository.findByCorreo(personaBean.getCorreo());

        if (foundCorreo.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Persona ya existente"), HttpStatus.BAD_REQUEST);
        } else {
            PersonaBean savedPersona = repository.saveAndFlush(personaBean);
            return new ResponseEntity<>(new ApiResponse(savedPersona, HttpStatus.OK, "¡Persona registrado exitosamente!"), HttpStatus.OK);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PersonaBean updatePersona) {
        Optional<PersonaBean> existingPersonOptional = repository.findById(updatePersona.getIdPersonas());
        if (existingPersonOptional.isPresent()){

            return new ResponseEntity<>(new ApiResponse(repository.save(updatePersona), HttpStatus.OK, "Persona actualizada exitosamente"), HttpStatus.OK);

        }else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
        }
    }

    //Eliminar Persona
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> deleteById(Long id) {
        Optional<PersonaBean> personOptional = repository.findById(id);
        if (personOptional.isPresent()){
            repository.deleteById(id);
            return  new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Persona eliminada exitosamente"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
    }
}
