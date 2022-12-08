package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Ejercicio;
import com.sistema.fisioterapia.model.Rol;
import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RolRepository extends JpaRepository<Rol,Long> {

    @Query(value="SELECT c.* FROM roles c WHERE c.rol_nombre ='PACIENTE'", nativeQuery=true)
    Rol obtenerRolPaciente();

    @Query(value="SELECT c.* FROM roles c WHERE c.rol_nombre ='FISIOTERAPEUTA'", nativeQuery=true)
    Rol obtenerRolFisioterapeuta();


}
