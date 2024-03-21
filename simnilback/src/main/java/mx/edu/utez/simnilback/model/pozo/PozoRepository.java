package mx.edu.utez.simnilback.model.pozo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PozoRepository extends JpaRepository<PozoBean, Long> {
    Optional<PozoBean> findByNombre(String nombre);

    @Modifying
    @Query (value = "Insert into pozos_personas (fk_id_persona, fk_id_pozo) values (:personaId, :pozoId)", nativeQuery = true)
    int savePersonaPozo (@Param("personaId") Long personaId, @Param("pozoId") Long pozoId);

}
