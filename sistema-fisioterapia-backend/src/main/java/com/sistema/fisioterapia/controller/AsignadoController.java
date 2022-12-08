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


    @GetMapping("/paciente/{username}")
    public ResponseEntity <?> obtenerAsignadosPaciente(@PathVariable("username") String username){
        return ResponseEntity.ok(asignadoService.obtenerAsignadosPaciente(username));
    }

    @GetMapping("/codigo/{username}")
    public ResponseEntity <?> obtenerCodigoAsignadosPaciente(@PathVariable("username") String username){
        return ResponseEntity.ok(asignadoService.obtenerCodigoAsignadosPaciente(username));
    }


    @GetMapping("/codigo/byId/{paciente_id}")
    public ResponseEntity <?> obtenerCodigoAsignadosPaciente(@PathVariable("paciente_id") Long paciente_id){
        return ResponseEntity.ok(asignadoService.obtenerCodigoAsignadosPacientebyId(paciente_id));
    }
}
