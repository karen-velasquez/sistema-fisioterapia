package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.ChangePassword;
import com.sistema.fisioterapia.model.EmailValues;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.services.EmailService;
import com.sistema.fisioterapia.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/email")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    EmailService emailService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.mail.username}")
    private String mailFrom;

    @GetMapping("/send_html/{username}")
    public ResponseEntity<?> sendEmailTemplate(@PathVariable("username") String username){
        Usuario usuarioOpt = (usuarioService.obtenerUsuario(username));
        if(usuarioOpt==null){
            return new ResponseEntity<>("no existe un usuario con ese nombre ", HttpStatus.NOT_FOUND);
        }
        Usuario usuario = usuarioOpt;

        //Colocando los datos en el modelo de datos del Correo
        EmailValues emailValues = new EmailValues();
        emailValues.setUserName(username);
        emailValues.setMailFrom(mailFrom);
        emailValues.setSubject("Cambio de contraseña");
        emailValues.setUserName(usuario.getUsername());
        emailValues.setMailTo(usuario.getCorreo());

        //Generando el token par ala BDD
        UUID uuid = UUID.randomUUID();
        String tokenPassword = uuid.toString();
        emailValues.setToken(tokenPassword);

        usuario.setTokenpassword(tokenPassword);
        usuarioService.actualizarUsuario(usuario);

        emailService.sendEmailTemplate(emailValues);

        EmailValues emailValues1 = new EmailValues();
        emailValues1.setUserName(username);
        return ResponseEntity.ok(emailValues1);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassword changePassword, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>("campos mal puestos", HttpStatus.BAD_REQUEST);
        }
        if(!changePassword.getPassword().equals(changePassword.getConfirmPassword())){
            return new ResponseEntity<>("contraseñas no coinciden", HttpStatus.BAD_REQUEST);
        }

        Optional<Usuario> usuarioOpt = Optional.ofNullable(usuarioService.obterUsuarioPorToken(changePassword.getTokenPassword()));
        if(!usuarioOpt.isPresent()){
            return new ResponseEntity<>("no existe un usuario con es nombre ", HttpStatus.NOT_FOUND);
        }
        Usuario usuario = usuarioOpt.get();
        String newPassword = this.bCryptPasswordEncoder.encode(changePassword.getPassword());
        usuario.setPassword(newPassword);
        usuario.setTokenpassword(null);
        usuarioService.actualizarUsuario(usuario);


        EmailValues emailValues1 = new EmailValues();
        emailValues1.setUserName(usuario.getUsername());
        return ResponseEntity.ok(emailValues1);

    }

}
