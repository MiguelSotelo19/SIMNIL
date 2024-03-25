package mx.edu.utez.simnilback.model.rol;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<RolBean, Long> {
    Optional<RolBean> findByRol(String rol);


    @Query(value = "SELECT r FROM RolBean r WHERE r.rol = :rolNom")
    RolBean getRolByNom(@Param("rolNom") String rolNom);

    @Modifying
    @Query(value = "INSERT INTO roles (rol) VALUES (:rolNom)", nativeQuery = true)
    void saveRol(@Param("rolNom") String rolNom);


}
