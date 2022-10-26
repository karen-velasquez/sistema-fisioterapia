package com.sistema.fisioterapia.services;

import com.sistema.fisioterapia.model.Lesion;
import com.sistema.fisioterapia.model.Usuario;

import java.util.Set;

public interface LesionService {
    public void guardarLesion(Lesion lesion, Long usuarioId) throws Exception;

    Lesion guardarLesiones(Lesion pregunta);

    public Lesion obtenerLesion(Long lesion_id);
}
