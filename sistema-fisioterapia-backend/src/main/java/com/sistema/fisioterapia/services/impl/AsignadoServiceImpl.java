package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.Asignado;
import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.repositories.AsignadoRepository;
import com.sistema.fisioterapia.services.AsignadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsignadoServiceImpl implements AsignadoService {

    @Autowired
    private AsignadoRepository asignadoRepository;

    @Override
    public Asignado guardarAsignado(Asignado asignado){
        return asignadoRepository.save(asignado);
    };

    @Override
    public Asignado obtenerAsignado(Long asignado_id){
        return asignadoRepository.findById(asignado_id).get();
    };

    @Override
    public List<Asignado> listarAsignados(){
        List<Asignado> all= asignadoRepository.findAll();
        return all;
    };

    @Override
    public List<Asignado> guardarAsignados(List<Asignado> asignados){
        return asignadoRepository.saveAll(asignados);
    };

    @Override
    public List<Asignado> obtenerAsignadosPaciente(Long paciente_id){
        List<Asignado> all= asignadoRepository.find_asignados(paciente_id);
        return all;
    };

}
