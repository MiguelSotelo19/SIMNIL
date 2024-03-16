package mx.edu.utez.simnilback.model.historial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorialRepository extends JpaRepository<HistorialBean, Long> {
}
