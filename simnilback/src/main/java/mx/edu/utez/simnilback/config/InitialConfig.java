package mx.edu.utez.simnilback.config;

import mx.edu.utez.simnilback.model.persona.PersonaBean;
import mx.edu.utez.simnilback.model.persona.PersonaRepository;
import mx.edu.utez.simnilback.model.rol.RolBean;
import mx.edu.utez.simnilback.model.rol.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Configuration
public class InitialConfig implements CommandLineRunner {

    private final RolRepository rolRepository;
    private final PersonaRepository userRepository;

    private final PasswordEncoder encoder;


    public InitialConfig(RolRepository rolRepository, PersonaRepository userRepository, PasswordEncoder encoder) {
        this.rolRepository = rolRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    @Transactional(rollbackFor = {SQLException.class})
    public void run(String... args) throws Exception {
        // Guardar un nuevo rol si no existe

        // Obtener o guardar el rol "Admin"
        RolBean adminRole = getOrSaveRole(new RolBean("Admin"));

        // Obtener el ID del rol "Admin" (puedes omitir este paso si no lo necesitas)
        Long adminRoleId = adminRole.getIdRol();

        // Obtener o guardar una persona y asignarle el rol "Admin"
        PersonaBean person = getOrSavePerson(
                new PersonaBean("Persona2", "Paterno", "Materno", "correo", "usuario2", encoder.encode("pass"), true, "1112223365", adminRole)
        );

        // Convertir el booleano a entero (si es necesario)
        int estatusInt = person.getEstatus() ? 1 : 0;

    }

    // Método getOrSavePerson modificado para no realizar la inserción directamente
    @Transactional
    public PersonaBean getOrSavePerson(PersonaBean person) {
        Optional<PersonaBean> existingPerson = userRepository.findByNombreUsuario(person.getNombreUsuario());
        return existingPerson.orElseGet(() -> userRepository.saveAndFlush(person));
    }



    @Transactional
    public RolBean getOrSaveRole(RolBean role) {
        Optional<RolBean> foundRole = rolRepository.findByRol(role.getRol());
        return foundRole.orElseGet(() -> rolRepository.saveAndFlush(role));
    }


//    @Transactional
//    public void saveUserRoles(Long userId, Long roleId) {
//        Long count = userRepository.countUserRoles(userId, roleId);
//        if (count == 0) {
//            // Aquí puedes agregar la lógica para guardar la relación entre el usuario y el rol
//        }
//    }

}
