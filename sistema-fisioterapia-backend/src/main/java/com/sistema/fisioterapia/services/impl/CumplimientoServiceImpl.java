package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.repositories.CumplimientoRepository;
import com.sistema.fisioterapia.services.CumplimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CumplimientoServiceImpl implements CumplimientoService {

    @Autowired
    CumplimientoRepository cumplimientoRepository;

    @Override
    public Cumplimiento guardarCumplimiento(Cumplimiento cumplimiento){
        return cumplimientoRepository.save(cumplimiento);
    }

    @Override
    public Cumplimiento obtenerCumplimiento(Long sesion_id){
        return cumplimientoRepository.findById(sesion_id).get();
    }

    @Override
    public List<Cumplimiento> listarCumplimientos(){
        List<Cumplimiento> all = cumplimientoRepository.findAll();
        return all;
    }

}
