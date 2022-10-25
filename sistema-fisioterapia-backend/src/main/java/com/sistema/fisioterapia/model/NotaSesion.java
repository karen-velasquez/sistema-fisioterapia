package com.sistema.fisioterapia.model;


import javax.persistence.*;

@Entity
@Table(name="notaSesion")
public class NotaSesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notaId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Sesion sesionId;

    private String notaSesion;

    public Long getNotaId() {
        return notaId;
    }

    public void setNotaId(Long notaId) {
        this.notaId = notaId;
    }

    public Sesion getSesionId() {
        return sesionId;
    }

    public void setSesionId(Sesion sesionId) {
        this.sesionId = sesionId;
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