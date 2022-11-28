package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.NotaSesion;
import com.sistema.fisioterapia.model.Sesion;

import java.util.List;

public interface NotaSesionService {

    public NotaSesion guardarNotaSesion(NotaSesion notaSesion);
    public NotaSesion obtenerNotaSesion(Long nota_sesion_id);

    public List<NotaSesion> listarNotasSesiones();

    public List<NotaSesion> guardarNotasSesiones(List<NotaSesion> notasSesiones);

    public List<NotaSesion> listarNotasSesionesPaciente(Long usuarioId, Long lesion_id );


}
