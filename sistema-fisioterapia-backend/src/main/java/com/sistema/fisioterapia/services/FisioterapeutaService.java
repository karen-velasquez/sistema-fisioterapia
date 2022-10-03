package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Fisioterapeuta;
import com.sistema.fisioterapia.model.Paciente;
import com.sistema.fisioterapia.repositories.FisioterapeutaRepository;
import com.sistema.fisioterapia.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FisioterapeutaService {

    @Autowired
    private FisioterapeutaRepository fisioterapeutaRepository;

    public List<Fisioterapeuta> listarFisioterapeutas(){
        return fisioterapeutaRepository.findAll();
    }

    public void guardarFisioterapeuta(Fisioterapeuta fisioterapeuta){
        fisioterapeutaRepository.save(fisioterapeuta);
    }

    public Fisioterapeuta obtenerFisioterapeutaporId(Long id){
        return fisioterapeutaRepository.findById(id).get();
    }

    public void eliminarFisioterapeuta(Long id){
        fisioterapeutaRepository.deleteById(id);
    }


}
