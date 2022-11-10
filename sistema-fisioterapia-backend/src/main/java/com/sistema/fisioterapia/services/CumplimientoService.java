package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Sesion;

import java.util.List;

public interface CumplimientoService {

    public Cumplimiento guardarCumplimiento(Cumplimiento cumplimiento);

    public Cumplimiento obtenerCumplimiento(Long sesion_id);

    public List<Cumplimiento> listarCumplimientos();

}
