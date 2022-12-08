package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.model.CoordsCumplimiento;
import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.model.Usuario;
import com.sistema.fisioterapia.repositories.CoordsCumplimientoInterface;
import com.sistema.fisioterapia.repositories.CumplimientoRepository;
import com.sistema.fisioterapia.repositories.UsuarioRepository;
import com.sistema.fisioterapia.services.CumplimientoService;
import com.sun.prism.image.Coords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CumplimientoServiceImpl implements CumplimientoService {

    @Autowired
    CumplimientoRepository cumplimientoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

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

    @Override
    public List<Object[]> obtenerPromedioCumplimiento(String username, Long asignado_id){
        Usuario usuario = usuarioRepository.findByUsername(username);
        List<Object[]> all = cumplimientoRepository.get_promedio_cumplimiento(usuario.getUsuarioId(), asignado_id);
        return all;
    }


    @Override
    public List<CoordsCumplimientoInterface> obtenerPromedioCumplimientoModel(String username, Long asignado_id){
        Usuario usuario = usuarioRepository.findByUsername(username);
        List<CoordsCumplimientoInterface> all = cumplimientoRepository.get_promedio_cumplimiento_model(usuario.getUsuarioId(), asignado_id);
        return all;
    }


    @Override
    public List<CoordsCumplimientoInterface> obtenerPromedioCumplimientoModelbyId(Long paciente_id, Long asignado_id){
        List<CoordsCumplimientoInterface> all = cumplimientoRepository.get_promedio_cumplimiento_model(paciente_id, asignado_id);
        return all;
    }


}
