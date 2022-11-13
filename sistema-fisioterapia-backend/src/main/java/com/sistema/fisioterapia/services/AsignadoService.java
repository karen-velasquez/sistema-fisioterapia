package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Asignado;
import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;

import java.util.List;

public interface AsignadoService {

    public Asignado guardarAsignado(Asignado asignado);

    public Asignado obtenerAsignado(Long asignado_id);

    public List<Asignado> listarAsignados();

    public List<Asignado> guardarAsignados(List<Asignado> asignados);

    public List<Asignado> obtenerAsignadosPaciente(Long paciente_id);


}
