package mx.edu.utez.simnilback.controller.rol;

import lombok.AllArgsConstructor;
import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.rol.DTO.RolDTO;
import mx.edu.utez.simnilback.service.rol.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/simnil/rol")
@AllArgsConstructor
public class RolController {

    private final RolService service;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> findRoles(){
        return service.findAll();
    }

    /*@GetMapping("/{rol}")
    public ResponseEntity<ApiResponse> findRol(@PathVariable("rol") String rol){
        return service.finOne(rol);
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findRol(@PathVariable("id") Long Idrol){
        return service.finOneId(Idrol);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> saveRol(@RequestBody RolDTO dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/")
    public ResponseEntity<ApiResponse> updateRol(@RequestBody RolDTO dto){
        return service.update(dto.toUpdate());
    }

}
