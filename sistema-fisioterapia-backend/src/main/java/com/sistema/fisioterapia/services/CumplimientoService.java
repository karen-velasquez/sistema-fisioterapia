package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.CoordsCumplimiento;
import com.sistema.fisioterapia.model.Cumplimiento;
import com.sistema.fisioterapia.model.Sesion;
import com.sistema.fisioterapia.repositories.CoordsCumplimientoInterface;

import java.util.List;

public interface CumplimientoService {

    public Cumplimiento guardarCumplimiento(Cumplimiento cumplimiento);

    public Cumplimiento obtenerCumplimiento(Long sesion_id);

    public List<Cumplimiento> listarCumplimientos();

    public List<Object[]> obtenerPromedioCumplimiento(String username, Long asignado_id);

    public List<CoordsCumplimientoInterface> obtenerPromedioCumplimientoModel(String username, Long asignado_id);

    public List<CoordsCumplimientoInterface> obtenerPromedioCumplimientoModelbyId(Long paciente_id, Long asignado_id);

}
