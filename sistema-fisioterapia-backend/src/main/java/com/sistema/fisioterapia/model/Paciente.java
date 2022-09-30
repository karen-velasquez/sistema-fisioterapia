package com.sistema.fisioterapia.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="pacientes")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pacienteId;

    private String pacienteNick;
    private String pacientePassword;
    private String pacienteNombres;
    private String pacienteApellidos;
    private int pacienteEdad;
    private String pacienteDescrLesion;

    /*Generando la conexion de uno a muchos de paciente a sesion*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "paciente")
    @JsonIgnore
    private Set<Sesion> sesion = new HashSet<>();


    /*Generando la conexion de uno a muchos de paciente a asignado*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "ejercicio")
    @JsonIgnore
    private Set<Asignado> asignado = new HashSet<>();

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getPacienteNick() {
        return pacienteNick;
    }

    public void setPacienteNick(String pacienteNick) {
        this.pacienteNick = pacienteNick;
    }

    public String getPacientePassword() {
        return pacientePassword;
    }

    public void setPacientePassword(String pacientePassword) {
        this.pacientePassword = pacientePassword;
    }

    public String getPacienteNombres() {
        return pacienteNombres;
    }

    public void setPacienteNombres(String pacienteNombres) {
        this.pacienteNombres = pacienteNombres;
    }

    public String getPacienteApellidos() {
        return pacienteApellidos;
    }

    public void setPacienteApellidos(String pacienteApellidos) {
        this.pacienteApellidos = pacienteApellidos;
    }

    public int getPacienteEdad() {
        return pacienteEdad;
    }

    public void setPacienteEdad(int pacienteEdad) {
        this.pacienteEdad = pacienteEdad;
    }

    public String getPacienteDescrLesion() {
        return pacienteDescrLesion;
    }

    public void setPacienteDescrLesion(String pacienteDescrLesion) {
        this.pacienteDescrLesion = pacienteDescrLesion;
    }


    public Set<Sesion> getSesion() {
        return sesion;
    }

    public void setSesion(Set<Sesion> sesion) {
        this.sesion = sesion;
    }

    public Set<Asignado> getAsignado() {
        return asignado;
    }

    public void setAsignado(Set<Asignado> asignado) {
        this.asignado = asignado;
    }

    public Paciente(){

    }
}
