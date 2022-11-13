package com.sistema.fisioterapia.repositories;
import com.sistema.fisioterapia.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EjercicioRepository extends JpaRepository<Ejercicio,Long> {

    @Query(value="SELECT c.* FROM ejercicios c WHERE c.parte_cuerpo =:parte", nativeQuery=true)
    List<Ejercicio> find_parte_cuerpo(@Param("parte") String parte);

}
