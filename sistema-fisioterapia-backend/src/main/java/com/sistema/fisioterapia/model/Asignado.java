package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="asignados")
public class Asignado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long asignadoId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario pacienteId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Ejercicio ejercicioId;

    private String repeticiones;

    private String series;

    private String fechaAsignado;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "asignadoId")
    @JsonIgnore
    private Set<Cumplimiento> cumplimientoEjercicio = new HashSet<>();




    public Long getAsignadoId() {
        return asignadoId;
    }

    public void setAsignadoId(Long asignadoId) {
        this.asignadoId = asignadoId;
    }

    public Usuario getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Usuario pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Ejercicio getEjercicioId() {
        return ejercicioId;
    }

    public void setEjercicioId(Ejercicio ejercicioId) {
        this.ejercicioId = ejercicioId;
    }

    public String getRepeticiones() {
        return repeticiones;
    }

    public void setRepeticiones(String repeticiones) {
        this.repeticiones = repeticiones;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public Set<Cumplimiento> getCumplimientoEjercicio() {
        return cumplimientoEjercicio;
    }

    public String getFechaAsignado() {
        return fechaAsignado;
    }

    public void setFechaAsignado(String fechaAsignado) {
        this.fechaAsignado = fechaAsignado;
    }

    public void setCumplimientoEjercicio(Set<Cumplimiento> cumplimientoEjercicio) {
        this.cumplimientoEjercicio = cumplimientoEjercicio;
    }

    public Asignado(){

    }
}
