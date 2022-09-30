package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Asignado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long asignadoId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.EAGER)
    private Fisioterapeuta fisioterapeuta;

    @ManyToOne(fetch = FetchType.EAGER)
    private Repeticion repeticion;

    @ManyToOne(fetch = FetchType.EAGER)
    private Ejercicio ejercicio;

    private String fechaInicio;

    private String fechaFinalizacion;



    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "asignado")
    @JsonIgnore
    private Set<CumplimientoEjercicio> cumplimientoEjercicio = new HashSet<>();





    public Long getAsignadoId() {
        return asignadoId;
    }

    public void setAsignadoId(Long asignadoId) {
        this.asignadoId = asignadoId;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Fisioterapeuta getFisioterapeuta() {
        return fisioterapeuta;
    }

    public void setFisioterapeuta(Fisioterapeuta fisioterapeuta) {
        this.fisioterapeuta = fisioterapeuta;
    }

    public Repeticion getRepeticion() {
        return repeticion;
    }

    public void setRepeticion(Repeticion repeticion) {
        this.repeticion = repeticion;
    }

    public Ejercicio getEjercicio() {
        return ejercicio;
    }

    public void setEjercicio(Ejercicio ejercicio) {
        this.ejercicio = ejercicio;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFinalizacion() {
        return fechaFinalizacion;
    }

    public void setFechaFinalizacion(String fechaFinalizacion) {
        this.fechaFinalizacion = fechaFinalizacion;
    }




    public Set<CumplimientoEjercicio> getCumplimientoEjercicio() {
        return cumplimientoEjercicio;
    }

    public void setCumplimientoEjercicio(Set<CumplimientoEjercicio> cumplimientoEjercicio) {
        this.cumplimientoEjercicio = cumplimientoEjercicio;
    }




    public Asignado(){

    }
}
