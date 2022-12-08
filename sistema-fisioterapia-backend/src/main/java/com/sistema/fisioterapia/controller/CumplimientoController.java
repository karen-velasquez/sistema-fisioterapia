package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.services.CumplimientoService;
import com.sistema.fisioterapia.services.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cumplimiento")
@CrossOrigin("*")
public class CumplimientoController {

    @Autowired
    private CumplimientoService cumplimientoService;


    @PostMapping("/")
    public ResponseEntity<Cumplimiento> guardarCumpliento(@RequestBody Cumplimiento cumplimiento){
        return ResponseEntity.ok(cumplimientoService.guardarCumplimiento(cumplimiento));
    }




    @GetMapping("/{cumplimiento_id}")
    public Cumplimiento obtenerCumplimiento(@PathVariable("cumplimiento_id") Long cumplimiento_id) {
        return cumplimientoService.obtenerCumplimiento(cumplimiento_id);
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listarCumplimientos() {
        return ResponseEntity.ok(cumplimientoService.listarCumplimientos());
    }

    @GetMapping("/{username}/{asignado_id}")
    public ResponseEntity<?> listarPromedioCumplimientos(@PathVariable("username") String username, @PathVariable("asignado_id") Long asignado_id) {
        return ResponseEntity.ok(cumplimientoService.obtenerPromedioCumplimiento(username, asignado_id));
    }


    @GetMapping("/model/{username}/{asignado_id}")
    public ResponseEntity<?> listarPromedioCumplimientosModel(@PathVariable("username") String username, @PathVariable("asignado_id") Long asignado_id) {
        return ResponseEntity.ok(cumplimientoService.obtenerPromedioCumplimientoModel(username, asignado_id));
    }


    @GetMapping("/model/byId/{paciente_id}/{asignado_id}")
    public ResponseEntity<?> listarPromedioCumplimientosModelbyId(@PathVariable("paciente_id") Long paciente_id, @PathVariable("asignado_id") Long asignado_id) {
        return ResponseEntity.ok(cumplimientoService.obtenerPromedioCumplimientoModelbyId(paciente_id,asignado_id));
    }




}
