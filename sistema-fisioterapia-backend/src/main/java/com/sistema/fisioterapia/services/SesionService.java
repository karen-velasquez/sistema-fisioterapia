package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Sesion;

import java.util.List;


public interface SesionService {

    public Sesion guardarSesion(Sesion sesion);

    public Sesion obtenerSesion(Long sesion_id);

    public List<Sesion> listarSesiones();

    public List<Sesion> listarSesionesFisioterapeuta(String username);

}
