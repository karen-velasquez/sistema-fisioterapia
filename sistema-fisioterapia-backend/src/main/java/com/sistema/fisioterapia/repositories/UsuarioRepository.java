package com.sistema.fisioterapia.repositories;

import com.sistema.fisioterapia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    public Usuario findByUsername(String username);

}
