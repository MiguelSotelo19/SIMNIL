package mx.edu.utez.simnilback.model.persona;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PersonaRepository extends JpaRepository<PersonaBean, Long> {

    Optional<PersonaBean> findByNumeroTelefoncico(String numeroTelefonico);
    Optional<PersonaBean> findByCorreo(String correoElectronico);
}
