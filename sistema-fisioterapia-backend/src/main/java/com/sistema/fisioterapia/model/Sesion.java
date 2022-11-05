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
    private Long Id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario pacienteId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario fisioterapeutaId;

    private String Subject;

    private String StartTime;

    private String EndTime;

    private String Description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "sesionId")
    @JsonIgnore
    private Set<NotaSesion> sesion = new HashSet<>();

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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


    public String getSubject() {
        return Subject;
    }

    public void setSubject(String subject) {
        Subject = subject;
    }

    public String getStartTime() {
        return StartTime;
    }

    public void setStartTime(String startTime) {
        StartTime = startTime;
    }

    public String getEndTime() {
        return EndTime;
    }

    public void setEndTime(String endTime) {
        EndTime = endTime;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
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
