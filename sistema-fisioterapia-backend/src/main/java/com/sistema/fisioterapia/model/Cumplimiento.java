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

    private String serieRealizada;

    private String fechaCumplimiento;


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

    public String getSerieRealizada() {
        return serieRealizada;
    }

    public void setSerieRealizada(String serieRealizada) {
        this.serieRealizada = serieRealizada;
    }

    public String getFechaCumplimiento() {
        return fechaCumplimiento;
    }

    public void setFechaCumplimiento(String fechaCumplimiento) {
        this.fechaCumplimiento = fechaCumplimiento;
    }

    public Cumplimiento() {

    }
}
