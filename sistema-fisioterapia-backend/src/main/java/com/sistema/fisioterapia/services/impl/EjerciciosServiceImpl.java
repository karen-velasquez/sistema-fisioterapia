package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.Ejercicio;
import com.sistema.fisioterapia.repositories.EjercicioRepository;
import com.sistema.fisioterapia.services.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EjerciciosServiceImpl implements EjercicioService {
    @Autowired
    private EjercicioRepository ejercicioRepository;

    @Override
    public Ejercicio guardarEjercicio(Ejercicio ejercicio){
        return ejercicioRepository.save(ejercicio);
    }

    @Override
    public Ejercicio obtenerEjercicio(Long ejercicio_id){
        return ejercicioRepository.findById(ejercicio_id).get();
    };

    @Override
    public List<Ejercicio> listarEjercicios(){
        return ejercicioRepository.findAll();
    };

    @Override
    public List<Ejercicio> listarParteCuerpo(String parte){
        return  ejercicioRepository.find_parte_cuerpo(parte);
    };


}
