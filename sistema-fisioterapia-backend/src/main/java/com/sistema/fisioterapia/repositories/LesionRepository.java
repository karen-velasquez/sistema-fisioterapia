package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Asignado;
import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Rol;
import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LesionRepository extends JpaRepository<Lesion,Long> {
    @Query(value="SELECT c.* FROM asignados c WHERE c.paciente_id_usuario_id =:paciente_id", nativeQuery=true)
    List<Asignado> find_asignados(@Param("paciente_id") Long paciente_id);
    @Query(value="SELECT c.* FROM lesiones c WHERE c.paciente_id_usuario_id = c.", nativeQuery=true)
    List<Lesion> obtener_lesiones_bypacienteId(@Param("paciente_id") Long paciente_id);
}
