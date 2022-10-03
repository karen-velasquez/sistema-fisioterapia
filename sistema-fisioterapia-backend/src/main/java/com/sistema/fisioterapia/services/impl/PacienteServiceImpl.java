package com.sistema.fisioterapia.services.impl;

import com.sistema.fisioterapia.repositories.FisioterapeutaRepository;
import com.sistema.fisioterapia.repositories.PacienteRepository;
import com.sistema.fisioterapia.repositories.RolRepository;
import com.sistema.fisioterapia.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteServiceImpl {
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private FisioterapeutaRepository fisioterapeutaRepository;




}
