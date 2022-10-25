package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="sesion")
public class Sesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sesionId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario pacienteId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario fisioterapeutaId;

    private String nombreSesion;

    private String desdeFecha;

    private String hastaFecha;

    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "sesionId")
    @JsonIgnore
    private Set<NotaSesion> sesion = new HashSet<>();

    public Long getSesionId() {
        return sesionId;
    }

    public void setSesionId(Long sesionId) {
        this.sesionId = sesionId;
    }

    public Usuario getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Usuario pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Usuario  getFisioterapeutaId() {
        return fisioterapeutaId;
    }

    public void setFisioterapeutaId(Usuario  fisioterapeutaId) {
        this.fisioterapeutaId = fisioterapeutaId;
    }

    public String getNombreSesion() {
        return nombreSesion;
    }

    public void setNombreSesion(String nombreSesion) {
        this.nombreSesion = nombreSesion;
    }

    public String getDesdeFecha() {
        return desdeFecha;
    }

    public void setDesdeFecha(String desdeFecha) {
        this.desdeFecha = desdeFecha;
    }

    public String getHastaFecha() {
        return hastaFecha;
    }

    public void setHastaFecha(String hastaFecha) {
        this.hastaFecha = hastaFecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<NotaSesion> getSesion() {
        return sesion;
    }

    public void setSesion(Set<NotaSesion> sesion) {
        this.sesion = sesion;
    }

    public Sesion(){

    }
}
