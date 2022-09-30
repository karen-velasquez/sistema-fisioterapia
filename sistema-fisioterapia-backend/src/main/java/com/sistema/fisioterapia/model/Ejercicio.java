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

    private String ejercicioNombre;
    private String ejercicioTipo;
    private String ejercicioImagen;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "ejercicio")
    @JsonIgnore
    private Set<Asignado> asignado = new HashSet<>();



    public Long getEjercicioId() {
        return ejercicioId;
    }

    public void setEjercicioId(Long ejercicioId) {
        this.ejercicioId = ejercicioId;
    }

    public String getEjercicioNombre() {
        return ejercicioNombre;
    }

    public void setEjercicioNombre(String ejercicioNombre) {
        this.ejercicioNombre = ejercicioNombre;
    }

    public String getEjercicioTipo() {
        return ejercicioTipo;
    }

    public void setEjercicioTipo(String ejercicioTipo) {
        this.ejercicioTipo = ejercicioTipo;
    }

    public String getEjercicioImagen() {
        return ejercicioImagen;
    }

    public void setEjercicioImagen(String ejercicioImagen) {
        this.ejercicioImagen = ejercicioImagen;
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
