package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Paciente;
import com.sistema.fisioterapia.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> listarPacientes(){
        return pacienteRepository.findAll();
    }

    public void guardarPaciente(Paciente paciente){
        pacienteRepository.save(paciente);
    }

    public Paciente obtenerPacientePorId(Long id){
        return pacienteRepository.findById(id).get();
    }

    public void eliminarPaciente(Long id){
        pacienteRepository.deleteById(id);
    }


}
