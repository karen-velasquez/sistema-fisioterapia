package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.services.NotaSesionService;
import com.sistema.fisioterapia.services.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nota_sesion")
@CrossOrigin("*")
public class NotaSesionController {

    @Autowired
    private NotaSesionService notaSesionService;


    @PostMapping("/")
    public ResponseEntity<NotaSesion> guardarNotaSesion(@RequestBody NotaSesion notaSesion){
        return ResponseEntity.ok(notaSesionService.guardarNotaSesion(notaSesion));

    }

    @PostMapping("/todos")
    public ResponseEntity <?> guardarNotasSesiones(@RequestBody List<NotaSesion> notasSesiones){
        return ResponseEntity.ok(notaSesionService.guardarNotasSesiones(notasSesiones));
    }


    @GetMapping("/{nota_sesion_id}")
    public NotaSesion obtenerNotaSesion(@PathVariable("nota_sesion_id") Long nota_sesion_id) {
        return notaSesionService.obtenerNotaSesion(nota_sesion_id);
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listarNotasSesiones() {
        return ResponseEntity.ok(notaSesionService.listarNotasSesiones());
    }






    @GetMapping("/listar/{paciente_id}/{lesion_id}")
    public ResponseEntity<?> obtenerNotasSesionesPaciente(@PathVariable("paciente_id") Long paciente_id, @PathVariable("lesion_id") Long lesion_id) {

        return ResponseEntity.ok(notaSesionService.listarNotasSesionesPaciente(paciente_id, lesion_id));
    }

}
