package com.sistema.fisioterapia;

import com.sistema.fisioterapia.model.Rol;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.model.UsuarioRol;
import com.sistema.fisioterapia.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class SistemaFisioterapiaBackendApplication implements CommandLineRunner {

    @Autowired
    private UsuarioService usuarioService;

    public static void main(String[] args) {
        SpringApplication.run(SistemaFisioterapiaBackendApplication.class, args);
    }

    public void run(String... args) throws Exception {
		/*Usuario usuario = new Usuario();
		usuario.setNombre("Chris");
		usuario.setApellido("Ramirez");
		usuario.setUsername("cri");
		usuario.setPassword("12345");
		usuario.setEmail("c2@gmail.com");
		usuario.setTelefono("5435423");
		usuario.setPerfil("foto.png");

		Rol rol = new Rol();
		rol.setRolId(1L);
		rol.setNombre("ADMIN");

		Set<UsuarioRol> usuarioRoles =new HashSet<>();
		UsuarioRol usuarioRol = new UsuarioRol();
		usuarioRol.setRol(rol);
		usuarioRol.setUsuario(usuario);
		usuarioRoles.add(usuarioRol);

		Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario, usuarioRoles);
		System.out.println(usuarioGuardado.getUsername());
	*/}

}
