package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.NotaSesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotaSesionRepository extends JpaRepository<NotaSesion,Long> {

    @Query(value="SELECT c.* FROM nota_sesion c, sesion d " +
            "WHERE c.sesion_id_id = d.id and d.paciente_id_usuario_id=:paciente_id " +
            "and d.lesion_id_lesion_id=:lesion_id " +
            "ORDER BY STR_TO_DATE(c.fecha_nota, '%d/%m/%Y') ASC", nativeQuery=true)
    List<NotaSesion> obtener_notaSesion_bypacienteId(@Param("paciente_id") Long paciente_id, @Param("lesion_id") Long lesion_id);
}
