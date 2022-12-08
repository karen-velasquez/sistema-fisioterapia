package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.CoordsCumplimiento;
import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CumplimientoRepository extends JpaRepository<Cumplimiento,Long> {


    @Query(value="SELECT a.fecha_cumplimiento, AVG(a.aciertos)AS promedio\n" +
            "    FROM cumplimiento a, asignados b\n" +
            "    WHERE b.paciente_id_usuario_id =:paciente_id AND a.asignado_id_asignado_id = b.asignado_id " +
            "    AND a.asignado_id_asignado_id=:asignado_id\n" +
            "    GROUP BY a.fecha_cumplimiento, a.asignado_id_asignado_id, b.paciente_id_usuario_id\n" +
            "    ORDER BY STR_TO_DATE(a.fecha_cumplimiento, '%Y-%m-%d') ASC", nativeQuery=true)
    List<Object[]> get_promedio_cumplimiento(@Param("paciente_id") Long paciente_id, @Param("asignado_id") Long asignado_id);





    @Query(value="SELECT a.fecha_cumplimiento AS x, AVG(a.aciertos)AS y\n" +
            "    FROM cumplimiento a, asignados b\n" +
            "    WHERE b.paciente_id_usuario_id =:paciente_id AND a.asignado_id_asignado_id = b.asignado_id " +
            "    AND a.asignado_id_asignado_id=:asignado_id\n" +
            "    GROUP BY a.fecha_cumplimiento, a.asignado_id_asignado_id, b.paciente_id_usuario_id\n" +
            "    ORDER BY STR_TO_DATE(a.fecha_cumplimiento, '%Y-%m-%d') ASC", nativeQuery=true)
    List<CoordsCumplimientoInterface> get_promedio_cumplimiento_model(@Param("paciente_id") Long paciente_id, @Param("asignado_id") Long asignado_id);


}
