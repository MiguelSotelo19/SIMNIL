package mx.edu.utez.simnilback.model.pozo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PozoRepository extends JpaRepository<PozoBean, Long> {
}
