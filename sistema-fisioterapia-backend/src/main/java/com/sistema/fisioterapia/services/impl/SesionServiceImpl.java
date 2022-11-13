package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.repositories.SesionRepository;
import com.sistema.fisioterapia.repositories.UsuarioRepository;
import com.sistema.fisioterapia.services.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SesionServiceImpl implements SesionService {

    @Autowired
    private SesionRepository sesionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Sesion guardarSesion(Sesion sesion){
        return sesionRepository.save(sesion);
    };



    @Override
    public Sesion obtenerSesion(Long sesion_id){
        return sesionRepository.findById(sesion_id).get();
    };

    @Override
    public List<Sesion> listarSesiones(){
        List<Sesion> all= sesionRepository.findAll();

        return all;
    };



}
