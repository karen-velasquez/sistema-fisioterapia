package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="repeticiones")
public class Repeticion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long repeticionId;

    private String repeticionNombre;

    private String repeticionCantidad;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "repeticion")
    @JsonIgnore
    private Set<Asignado> asignado = new HashSet<>();

    public Long getRepeticionId() {
        return repeticionId;
    }

    public void setRepeticionId(Long repeticionId) {
        this.repeticionId = repeticionId;
    }

    public String getRepeticionNombre() {
        return repeticionNombre;
    }

    public void setRepeticionNombre(String repeticionNombre) {
        this.repeticionNombre = repeticionNombre;
    }

    public String getRepeticionCantidad() {
        return repeticionCantidad;
    }

    public void setRepeticionCantidad(String repeticionCantidad) {
        this.repeticionCantidad = repeticionCantidad;
    }

    public Set<Asignado> getAsignado() {
        return asignado;
    }

    public void setAsignado(Set<Asignado> asignado) {
        this.asignado = asignado;
    }

    public Repeticion(){

    }
}
