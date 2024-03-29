package mx.edu.utez.simnilback.model.persona;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.xml.transform.sax.SAXResult;
import java.util.Optional;
@Repository
public interface PersonaRepository extends JpaRepository<PersonaBean, Long> {

    Optional<PersonaBean> findByNumeroTelefonico(String numeroTelefonico);
    Optional<PersonaBean> findByCorreo(String correoElectronico);

    Optional<PersonaBean> findByNombreUsuario(String nombreUsurio);
    Optional<PersonaBean>findByContrasenia(String contrasenia);
}
