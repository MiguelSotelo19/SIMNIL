package mx.edu.utez.simnilback.model.persona;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PersonaRepository extends JpaRepository<PersonaBean, Long> {

    Optional<PersonaBean> findByNumeroTelefonico(String numeroTelefonico);
    Optional<PersonaBean> findByCorreo(String correoElectronico);

    Optional<PersonaBean> findByNombreUsuario(String nombreUsurio);
    Optional<PersonaBean>findByContrasenia(String contrasenia);

    //TABLA DE INTERSECCION
//    @Query("SELECT COUNT(p) FROM PersonaBean p WHERE p.idPersonas = :userId AND p.rolBean.idRol = :roleId")
//    Long countUserRoles(Long userId, Long roleId);


    @Modifying
    @Query(value = "INSERT INTO personas (estatus, fk_id_rol, numero_telefonico, apellido_materno, apellido_paterno, correo, nombre, nombre_usuario, contrasenia) " +
            "VALUES (:uEstatus, :uRolId, :uTel, :uApeMaterno, :uApePaterno, :uCorreo, :uNombre, :uNombreUsuario, :uContrasenia)",
            nativeQuery = true)
    void saveUser(@Param("uEstatus") String uEstatus,
                  @Param("uRolId") Long uRolId,
                  @Param("uTel") String uTel,
                  @Param("uApeMaterno") String uApeMaterno,
                  @Param("uApePaterno") String uApePaterno,
                  @Param("uCorreo") String uCorreo,
                  @Param("uNombre") String uNombre,
                  @Param("uNombreUsuario") String uNombreUsuario,
                  @Param("uContrasenia") String uContrasenia);



}
