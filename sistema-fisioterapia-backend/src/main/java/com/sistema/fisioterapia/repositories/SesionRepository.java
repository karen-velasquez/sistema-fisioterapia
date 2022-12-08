package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SesionRepository extends JpaRepository<Sesion,Long> {


    @Query(value="SELECT a.* FROM sesion a WHERE a.fisioterapeuta_id_usuario_id =:fisioterapeuta_id", nativeQuery=true)
    List<Sesion> buscarSesionFisioterapeuta(@Param("fisioterapeuta_id") Long fisioterapeuta_id);


}

