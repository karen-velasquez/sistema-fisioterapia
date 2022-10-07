package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Fisioterapeuta;
import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FisioterapeutaRepository extends JpaRepository<Fisioterapeuta, Long> {
    public Fisioterapeuta findByNickName(String id);
}
