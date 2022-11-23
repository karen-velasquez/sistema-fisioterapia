package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Rol;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.model.UsuarioRol;
import com.sistema.fisioterapia.services.LesionService;
import com.sistema.fisioterapia.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/lesion")
@CrossOrigin("*")
public class LesionController {

    @Autowired
    private LesionService lesionService;


    @PostMapping("/{usuarioId}")
    public void guardarlesion(@RequestBody Lesion lesion, @PathVariable("usuarioId") Long usuarioId) throws Exception {
        System.out.println(lesion.getPacienteId());
        lesionService.guardarLesion(lesion, usuarioId);
    }

    @GetMapping("/listar/{paciente_id}")
    public ResponseEntity<?> obtenerLesionesPaciente(@PathVariable("paciente_id") Long paciente_id) {
        return ResponseEntity.ok(lesionService.listarLesionesPaciente(paciente_id));
    }
    @PostMapping("/les")
    public ResponseEntity<Lesion> guardarlesiones(@RequestBody Lesion lesion){
        return ResponseEntity.ok(lesionService.guardarLesiones(lesion));
    }

    @GetMapping("/{lesion_id}")
    public Lesion obtenerLesion(@PathVariable("lesion_id") Long lesion_id) {
        return lesionService.obtenerLesion(lesion_id);
    }

}