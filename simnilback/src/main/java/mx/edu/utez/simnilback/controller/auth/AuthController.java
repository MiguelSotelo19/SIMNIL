package mx.edu.utez.simnilback.controller.auth;

import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.controller.auth.dto.SignDto;
import mx.edu.utez.simnilback.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"*"})
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> signIn(@RequestBody SignDto dto) {
        return service.signIn(dto.getUsername(), dto.getPassword());
    }
}
