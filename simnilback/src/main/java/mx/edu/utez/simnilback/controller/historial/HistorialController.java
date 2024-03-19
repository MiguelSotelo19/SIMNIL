package mx.edu.utez.simnilback.controller.historial;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.historial.DTO.HistorialDto;
import mx.edu.utez.simnilback.model.historial.HistorialBean;
import mx.edu.utez.simnilback.service.historial.HistorialService;
import mx.edu.utez.simnilback.service.persona.PersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simnil/historial")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class HistorialController {
    private  final HistorialService service;
    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll()
    {return service.getAll();}

    @PostMapping("/")
    public ResponseEntity<ApiResponse> register(@RequestBody HistorialDto dto){
        return service.save(dto.toEntity());
    }


}
