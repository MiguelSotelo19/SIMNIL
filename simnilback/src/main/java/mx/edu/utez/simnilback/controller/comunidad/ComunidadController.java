package mx.edu.utez.simnilback.controller.comunidad;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.comunidad.DTO.ComunidadDto;
import mx.edu.utez.simnilback.service.comunidad.ComunidadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simnil/comunidades")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class ComunidadController {
    private final ComunidadService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> obtener(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable("id") Long id){
        return service.getOne(id);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> register(@RequestBody ComunidadDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> modify(@RequestBody ComunidadDto dto){
        return service.update(dto.toUpdate());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> erase(@PathVariable("id") Long id){
        return service.delete(id);
    }
}
