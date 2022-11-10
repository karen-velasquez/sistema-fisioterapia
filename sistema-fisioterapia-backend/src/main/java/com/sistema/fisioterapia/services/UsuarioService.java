package com.sistema.fisioterapia.services;


import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.model.UsuarioRol;

import java.util.List;
import java.util.Set;

public interface UsuarioService {

    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    public Usuario obtenerUsuario(String username);

    public Usuario obterUsuarioPorToken(String tokenPassword);

    public void eliminarUsuario(Long usuarioId);

    public List<Usuario> listarPacientes();

    public Usuario actualizarUsuario(Usuario usuario);

}