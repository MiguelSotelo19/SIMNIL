package mx.edu.utez.simnilback.model.comunidad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComunidadRepository extends JpaRepository<ComunidadBean, Long> {
}
