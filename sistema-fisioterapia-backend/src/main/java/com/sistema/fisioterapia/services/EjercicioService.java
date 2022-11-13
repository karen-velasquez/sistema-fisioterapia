package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Ejercicio;

import java.util.List;

public interface EjercicioService {

    public Ejercicio guardarEjercicio(Ejercicio ejercicio);

    public Ejercicio obtenerEjercicio(Long ejercicio_id);

    public List<Ejercicio> listarEjercicios();

    public List<Ejercicio> listarParteCuerpo(String parte);

}
