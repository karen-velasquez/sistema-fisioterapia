package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.repositories.NotaSesionRepository;
import com.sistema.fisioterapia.repositories.SesionRepository;
import com.sistema.fisioterapia.repositories.UsuarioRepository;
import com.sistema.fisioterapia.services.NotaSesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaSesionImpl implements NotaSesionService {

    @Autowired
    private NotaSesionRepository notaSesionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public NotaSesion guardarNotaSesion(NotaSesion notaSesion){
        return notaSesionRepository.save(notaSesion);
    };

    /*AQUI ESTA LA PRUEBAAAAAAAAAAAAAAAAAAA*/
    @Override
    public List<NotaSesion> guardarNotasSesiones(List<NotaSesion> notasSesiones){
        return notaSesionRepository.saveAll(notasSesiones);
    };


    @Override
    public NotaSesion obtenerNotaSesion(Long nota_sesion_id){
        return notaSesionRepository.findById(nota_sesion_id).get();
    };

    @Override
    public List<NotaSesion> listarNotasSesiones(){
        List<NotaSesion> all= notaSesionRepository.findAll();
        return all;
    };

    ;

    @Override
    public List<NotaSesion> listarNotasSesionesPaciente(Long usuarioId, Long lesionId){
        return notaSesionRepository.obtener_notaSesion_bypacienteId(usuarioId, lesionId);
    };

}
