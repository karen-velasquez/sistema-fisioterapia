package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{


    //public Paciente findByUsername(String username);
}
