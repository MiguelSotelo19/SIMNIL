package mx.edu.utez.simnilback.model.historial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.Date;
import java.util.Optional;

@Repository
public interface HistorialRepository extends JpaRepository<HistorialBean, Long> {
    Optional<HistorialBean> findByHoraRecopilacionAndFechaRecopilacionAndPozoBean_IdPozo(LocalTime horaRecopilacion, Date fechaRecopilacion, Long idPozo);
}
