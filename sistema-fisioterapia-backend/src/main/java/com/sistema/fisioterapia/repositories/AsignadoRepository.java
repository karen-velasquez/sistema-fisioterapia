package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Asignado;
import com.sistema.fisioterapia.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AsignadoRepository extends JpaRepository<Asignado,Long> {

    @Query(value="SELECT c.* FROM asignados c WHERE c.paciente_id_usuario_id =:paciente_id AND STR_TO_DATE(c.fechafinalizacion, '%Y-%m-%d') >= CURDATE()", nativeQuery=true)
    List<Asignado> find_asignados(@Param("paciente_id") Long paciente_id);

    @Query(value="SELECT a.asignado_id, b.nombre\n" +
            "FROM asignados a, ejercicios b\n" +
            "WHERE a.paciente_id_usuario_id =:paciente_id AND a.ejercicio_id_ejercicio_id = b.ejercicio_id", nativeQuery=true)
    List<Object[]> get_asignados_paciente(@Param("paciente_id") Long paciente_id);

}
