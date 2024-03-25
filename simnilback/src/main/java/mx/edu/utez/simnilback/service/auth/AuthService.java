package mx.edu.utez.simnilback.service.auth;

import mx.edu.utez.simnilback.config.ApiResponse;
import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.persona.PersonaRepository;
import mx.edu.utez.simnilback.security.jwt.JwtProvider;
import mx.edu.utez.simnilback.service.persona.PersonaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
public class AuthService {
    //private final PersonaService userService;
    private final PersonaRepository personaRepository;
    private final JwtProvider provider;
    private final AuthenticationManager manager;

    public AuthService(PersonaRepository personaRepository, JwtProvider provider, AuthenticationManager manager) {
        this.personaRepository = personaRepository;
        this.provider = provider;
        this.manager = manager;
    }

    @Transactional
    public ResponseEntity<ApiResponse> signIn(String username, String password) {
        try {
            Optional<PersonaBean> foundUser = personaRepository.findByNombreUsuario(username);
            if (foundUser.isEmpty())
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotFound"), HttpStatus.BAD_REQUEST);
            PersonaBean user = foundUser.get();
            if (!user.getEstatus())
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotEnabled"), HttpStatus.BAD_REQUEST);

            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            // Payload - DTO (token, attrs)

            return new ResponseEntity<>(new ApiResponse(token, HttpStatus.OK,"Token generado"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            String message = "CredentialsMismatch";
            if (e instanceof DisabledException)
                message = "UserDisabled";
            if (e instanceof AccountExpiredException)
                message = "Expiro";
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, message), HttpStatus.UNAUTHORIZED);
        }
    }
}
