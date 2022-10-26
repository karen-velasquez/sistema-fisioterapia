package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.exceptions.UsuarioFoundException;
import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.model.UsuarioRol;
import com.sistema.fisioterapia.repositories.LesionRepository;
import com.sistema.fisioterapia.repositories.UsuarioRepository;
import com.sistema.fisioterapia.services.LesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
@Service
public class LesionServiceImpl implements LesionService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LesionRepository lesionRepository;


    @Override
    public void guardarLesion(Lesion lesion, Long usuarioId) throws Exception {
        Usuario usuarioLocal = usuarioRepository.findById(usuarioId).get();
        if(usuarioLocal != null){
            System.out.println("El usuario existe");
            lesion.setPacienteId(usuarioLocal);
            lesionRepository.save(lesion);
        }else{
            System.out.println("Error");
        }


    }

    @Override
    public Lesion guardarLesiones(Lesion lesion){
        return lesionRepository.save(lesion);
    };



    @Override
    public Lesion obtenerLesion(Long lesion_id) {
        return lesionRepository.findById(lesion_id).get();
    }
}
