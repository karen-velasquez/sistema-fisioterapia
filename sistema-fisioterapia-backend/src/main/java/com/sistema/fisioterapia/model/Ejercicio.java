package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="ejercicios")
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ejercicioId;

    private String nombre;
    private String tipo;
    private String parteCuerpo;
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    private  PosicionCamara posicionCamaraId;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "ejercicioId")
    @JsonIgnore
    private Set<Asignado> asignado = new HashSet<>();



    public Long getEjercicioId() {
        return ejercicioId;
    }

    public void setEjercicioId(Long ejercicioId) {
        this.ejercicioId = ejercicioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getParteCuerpo() {
        return parteCuerpo;
    }

    public void setParteCuerpo(String parteCuerpo) {
        this.parteCuerpo = parteCuerpo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public PosicionCamara getPosicionCamaraId() {
        return posicionCamaraId;
    }

    public void setPosicionCamaraId(PosicionCamara posicionCamaraId) {
        this.posicionCamaraId = posicionCamaraId;
    }

    public Set<Asignado> getAsignado() {
        return asignado;
    }

    public void setAsignado(Set<Asignado> asignado) {
        this.asignado = asignado;
    }

    public Ejercicio(){

    }
}
