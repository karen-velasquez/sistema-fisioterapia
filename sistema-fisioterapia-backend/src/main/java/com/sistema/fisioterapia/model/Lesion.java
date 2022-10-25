package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="lesiones")
public class Lesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lesionId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario pacienteId;

    private String nombreLesion;

    private String antecedentes;

    private String evaluacion;


    public Long getLesionId() {
        return lesionId;
    }

    public void setLesionId(Long lesionId) {
        this.lesionId = lesionId;
    }

    public Usuario getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Usuario pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getNombreLesion() {
        return nombreLesion;
    }

    public void setNombreLesion(String nombreLesion) {
        this.nombreLesion = nombreLesion;
    }

    public String getAntecedentes() {
        return antecedentes;
    }

    public void setAntecedentes(String antecedentes) {
        this.antecedentes = antecedentes;
    }

    public String getEvaluacion() {
        return evaluacion;
    }

    public void setEvaluacion(String evaluacion) {
        this.evaluacion = evaluacion;
    }

    public Lesion(){

    }
}