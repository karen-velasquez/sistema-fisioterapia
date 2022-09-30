package com.sistema.fisioterapia.model;


import javax.persistence.*;

@Entity
public class NotaSesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notaId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Sesion sesion;

    private String notaSesion;

    public Long getNotaId() {
        return notaId;
    }

    public void setNotaId(Long notaId) {
        this.notaId = notaId;
    }

    public Sesion getSesion() {
        return sesion;
    }

    public void setSesion(Sesion sesion) {
        this.sesion = sesion;
    }

    public String getNotaSesion() {
        return notaSesion;
    }

    public void setNotaSesion(String notaSesion) {
        this.notaSesion = notaSesion;
    }

    public NotaSesion() {

    }
}