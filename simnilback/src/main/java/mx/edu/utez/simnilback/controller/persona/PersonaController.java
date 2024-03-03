package mx.edu.utez.simnilback.controller.persona;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.persona.DTO.PersonaDto;
import mx.edu.utez.simnilback.service.persona.PersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simnil/persona")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor

public class PersonaController {

   private  final PersonaService service;
    //Crear las Personas

    @PostMapping("/")
    public ResponseEntity<ApiResponse> save
            ( @RequestBody PersonaDto dto) {
        return service.save(dto.toEntity());}

    //Leer Persona por persona
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return service.getPersona(id);
    }

    //Actualizar Persona
    @PutMapping("/")
    public ResponseEntity<ApiResponse> update
    (@RequestBody PersonaDto dto){
        return service.update(dto.toUpdate());
    }

    //Mostrar todas las personas
    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll()
    {return service.getAll();}

    //Elliminar Persona
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteById(@PathVariable Long id){return service.deleteById(id);}
}