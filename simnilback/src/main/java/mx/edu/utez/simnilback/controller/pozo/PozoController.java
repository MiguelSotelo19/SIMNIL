package mx.edu.utez.simnilback.controller.pozo;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.pozo.DTO.PozoDto;
import mx.edu.utez.simnilback.service.pozo.PozoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/simnil/pozos")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PozoController {
    private final PozoService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return  service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable("id") Long id){
        return service.getOne(id);
    }

    @PostMapping("/{idPersona}")
    public ResponseEntity<ApiResponse> register(@RequestBody PozoDto dto, @PathVariable Long idPersona){
        return service.save(dto.toEntity(), idPersona);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> modify(@PathVariable("id") Long id, @RequestBody PozoDto dto){
        return service.update(dto.toUpdate(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> disable(@PathVariable("id") Long id){
        return service.changeStatus(id);
    }
}
