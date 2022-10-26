package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    @Query(value="SELECT c.* FROM usuarios c,roles a, usuario_rol b WHERE a.rol_nombre = 'PACIENTE' and b.rol_rol_id = a.rol_id and b.usuario_usuario_id = c.usuario_id;", nativeQuery=true)
    public List<Usuario> buscar_pacientes();

    // @Query(value="select b.* from contact u,phone b where u.id_user =:idUser and b.phones_status =:status and u.id_contact=b.id_contact and b.phone_number=:phoneNumber", nativeQuery=true)
    //PhonesEntity searchExistencePhone(@Param("idUser") int idUser, @Param("phoneNumber")int phoneNumber, @Param("status") int status);
    public Usuario findByUsername(String username);

}
