package com.sistema.fisioterapia.model;


import javax.persistence.*;

@Entity
@Table(name="cumplimiento")
public class Cumplimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cumplimientoId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Asignado asignadoId;

    private String repeticionRealizada;

    private String serieRealizada;


    public Long getCumplimientoId() {
        return cumplimientoId;
    }

    public void setCumplimientoId(Long cumplimientoId) {
        this.cumplimientoId = cumplimientoId;
    }

    public Asignado getAsignadoId() {
        return asignadoId;
    }

    public void setAsignadoId(Asignado asignadoId) {
        this.asignadoId = asignadoId;
    }

    public String getRepeticionRealizada() {
        return repeticionRealizada;
    }

    public void setRepeticionRealizada(String repeticionRealizada) {
        this.repeticionRealizada = repeticionRealizada;
    }

    public String getSerieRealizada() {
        return serieRealizada;
    }

    public void setSerieRealizada(String serieRealizada) {
        this.serieRealizada = serieRealizada;
    }

    public Cumplimiento() {

    }
}
