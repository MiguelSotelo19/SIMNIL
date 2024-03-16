package mx.edu.utez.simnilback.model.pozo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PozoRepository extends JpaRepository<PozoBean, Long> {
    Optional<PozoBean> findByNombre(String nombre);
}
