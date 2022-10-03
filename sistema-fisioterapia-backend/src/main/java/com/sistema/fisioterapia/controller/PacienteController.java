package com.sistema.fisioterapia.controller;


import com.sistema.fisioterapia.model.Paciente;
import com.sistema.fisioterapia.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/pacientes")
    public List<Paciente> listarPacientes(){
        return pacienteService.listarPacientes();
    }

    @GetMapping("/pacientes/{id}")
    public ResponseEntity<Paciente> obtenerPaciente(@PathVariable Long id){
        try{
            Paciente paciente = pacienteService.obtenerPacientePorId(id);
            return new ResponseEntity<Paciente>(paciente, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Paciente>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/pacientes")
    public void guardarPaciente(@RequestBody Paciente paciente){
        pacienteService.guardarPaciente(paciente);
    }

    @PutMapping("/pacientes/{id}")
    public ResponseEntity<?> actualizarPaciente(@RequestBody Paciente paciente, @PathVariable Long id){
        try {
            Paciente pacienteExistente = pacienteService.obtenerPacientePorId(id);
            pacienteExistente.setPacienteNombres(paciente.getPacienteNombres());
            pacienteExistente.setPacienteNick(paciente.getPacienteNick());

            pacienteService.guardarPaciente(pacienteExistente);
            return new ResponseEntity<Paciente>(HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<Paciente>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/pacientes/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        pacienteService.eliminarProducto(id);
    }



}
