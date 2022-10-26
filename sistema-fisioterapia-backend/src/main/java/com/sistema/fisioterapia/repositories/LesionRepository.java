package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LesionRepository extends JpaRepository<Lesion,Long> {
}
