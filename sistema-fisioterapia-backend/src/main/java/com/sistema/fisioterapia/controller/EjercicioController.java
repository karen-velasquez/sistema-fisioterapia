package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.Ejercicio;
import com.sistema.fisioterapia.services.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ejercicio")
@CrossOrigin("*")
public class EjercicioController {

    @Autowired
    private EjercicioService ejercicioService;


    @PostMapping("/")
    public ResponseEntity<Ejercicio> guardarEjercicio(@RequestBody Ejercicio ejercicio){
        return ResponseEntity.ok(ejercicioService.guardarEjercicio(ejercicio));
    }

    @GetMapping("/{ejercicio_id}")
    public Ejercicio obtenerEjercicio(@PathVariable("ejercicio_id") Long ejercicio_id) {
        return ejercicioService.obtenerEjercicio(ejercicio_id);
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listarEjercicios() {
        return ResponseEntity.ok(ejercicioService.listarEjercicios());
    }

    @GetMapping("/listar/{parte}")
    public ResponseEntity<?> listarEjerciciosParteCuerpo(@PathVariable("parte") String parte) {
        System.out.println(parte);
        return ResponseEntity.ok(ejercicioService.listarParteCuerpo(parte));
    }



}
