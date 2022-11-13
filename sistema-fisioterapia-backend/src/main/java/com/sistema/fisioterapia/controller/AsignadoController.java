package com.sistema.fisioterapia.controller;

import com.sistema.fisioterapia.model.Asignado;
import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.repositories.AsignadoRepository;
import com.sistema.fisioterapia.services.AsignadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asignado")
@CrossOrigin("*")
public class AsignadoController {

    @Autowired
    private AsignadoService asignadoService;


    @PostMapping("/")
    public ResponseEntity<Asignado> guardarAsignado(@RequestBody Asignado asignado){
        return ResponseEntity.ok(asignadoService.guardarAsignado(asignado));
    }

    @GetMapping("/{asignado_id}")
    public Asignado obtenerAsignado(@PathVariable("asignado_id") Long asignado_id) {
        return asignadoService.obtenerAsignado(asignado_id);
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listarAsignados() {
        return ResponseEntity.ok(asignadoService.listarAsignados());
    }


    @PostMapping("/guardarAsignados")
    public ResponseEntity <?> guardarAsignados(@RequestBody List<Asignado> asignados){
        return ResponseEntity.ok(asignadoService.guardarAsignados(asignados));
    }


    @GetMapping("/paciente/{paciente_id}")
    public ResponseEntity <?> guardarAsignados(@PathVariable("paciente_id") Long paciente_id){
        return ResponseEntity.ok(asignadoService.obtenerAsignadosPaciente(paciente_id));
    }

}
