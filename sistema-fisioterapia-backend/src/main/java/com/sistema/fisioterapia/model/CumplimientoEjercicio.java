package com.sistema.fisioterapia.model;


import javax.persistence.*;

@Entity
public class CumplimientoEjercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cumplimientoId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Asignado asignado;

    private String cantidadAsignada;

    private String cantidadRealizada;

    public Long getCumplimientoId() {
        return cumplimientoId;
    }

    public void setCumplimientoId(Long cumplimientoId) {
        this.cumplimientoId = cumplimientoId;
    }

    public Asignado getAsignado() {
        return asignado;
    }

    public void setAsignado(Asignado asignado) {
        this.asignado = asignado;
    }

    public String getCantidadAsignada() {
        return cantidadAsignada;
    }

    public void setCantidadAsignada(String cantidadAsignada) {
        this.cantidadAsignada = cantidadAsignada;
    }

    public String getCantidadRealizada() {
        return cantidadRealizada;
    }

    public void setCantidadRealizada(String cantidadRealizada) {
        this.cantidadRealizada = cantidadRealizada;
    }

    public CumplimientoEjercicio() {

    }
}
