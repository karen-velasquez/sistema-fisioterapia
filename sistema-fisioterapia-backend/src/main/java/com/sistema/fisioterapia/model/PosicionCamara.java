package com.sistema.fisioterapia.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="posicionCamara")
public class PosicionCamara {

    @Id
    private Long posicionCamaraId;
    private String descripcion;
    private String imagenUrl;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "posicionCamaraId")
    private Set<Ejercicio> posicionCamara = new HashSet<>();

    public Long getPosicionCamaraId() {
        return posicionCamaraId;
    }

    public void setPosicionCamaraId(Long posicionCamaraId) {
        this.posicionCamaraId = posicionCamaraId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Set<Ejercicio> getPosicionCamara() {
        return posicionCamara;
    }

    public void setPosicionCamara(Set<Ejercicio> posicionCamara) {
        this.posicionCamara = posicionCamara;
    }

    public PosicionCamara(){

    }

    public PosicionCamara(Long posicionCamaraId, String descripcion, String imagenUrl) {
        this.posicionCamaraId= posicionCamaraId;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
    }
}
