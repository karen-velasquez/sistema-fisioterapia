package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.exceptions.UsuarioFoundException;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.model.UsuarioRol;
import com.sistema.fisioterapia.repositories.RolRepository;
import com.sistema.fisioterapia.repositories.UsuarioRepository;
import com.sistema.fisioterapia.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception {
        Usuario usuarioLocal = usuarioRepository.findByUsername(usuario.getUsername());
        if(usuarioLocal != null){
            System.out.println("El usuario ya existe");
            throw new UsuarioFoundException("El usuario ya esta presente");
        }else{
            for(UsuarioRol usuarioRol:usuarioRoles){
                rolRepository.save(usuarioRol.getRol());
            }
            usuario.getUsuarioRoles().addAll(usuarioRoles);
            usuarioLocal = usuarioRepository.save(usuario);
        }
        return usuarioLocal;
    }

    @Override
    public Usuario actualizarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario obtenerUsuario(String username) {
        return usuarioRepository.buscarByUsername(username);
    }

    @Override
    public Usuario obterUsuarioPorToken(String tokenPassword){
        return usuarioRepository.findBytokenpassword(tokenPassword);
    };
    @Override
    public void eliminarUsuario(Long usuarioId) {
        usuarioRepository.deleteById(usuarioId);
    }

    @Override
    public List<Usuario> listarPacientes(){
        List<Usuario> all= usuarioRepository.buscar_pacientes();
        return all;
    };
}
