package com.sistema.fisioterapia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sistema.fisioterapia.configuration.Authority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;




@Entity
@Table(name="fisioterapeutas")


@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "Fisioterapeuta.findByNickName", query = "SELECT c FROM Fisioterapeuta c WHERE c.fisioterapeutaId = :id"),
})

public class Fisioterapeuta implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fisioterapeutaId;

    private String fisioterapeutaNick;
    private String fisioterapeutaIdPassword;
    private String fisioterapeutaNombres;
    private String fisioterapeutaApellidos;
    private String fisioterapeutaEdad;

    /*Generando la conexion de uno a muchos de fisioterapeuta a sesion*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "fisioterapeuta")
    @JsonIgnore
    private Set<Sesion> sesion = new HashSet<>();


    /*Generando la conexion de uno a muchos de fisioterapeuta a asignado*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "fisioterapeuta")
    @JsonIgnore
    private Set<Asignado> asignado = new HashSet<>();



    public Long getFisioterapeutaId() {
        return fisioterapeutaId;
    }

    public void setFisioterapeutaId(Long fisioterapeutaId) {
        this.fisioterapeutaId = fisioterapeutaId;
    }

    public String getFisioterapeutaNick() {
        return fisioterapeutaNick;
    }

    public void setFisioterapeutaNick(String fisioterapeutaNick) {
        this.fisioterapeutaNick = fisioterapeutaNick;
    }

    public String getFisioterapeutaIdPassword() {
        return fisioterapeutaIdPassword;
    }

    public void setFisioterapeutaIdPassword(String fisioterapeutaIdPassword) {
        this.fisioterapeutaIdPassword = fisioterapeutaIdPassword;
    }

    public String getFisioterapeutaNombres() {
        return fisioterapeutaNombres;
    }

    public void setFisioterapeutaNombres(String fisioterapeutaNombres) {
        this.fisioterapeutaNombres = fisioterapeutaNombres;
    }

    public String getFisioterapeutaApellidos() {
        return fisioterapeutaApellidos;
    }

    public void setFisioterapeutaApellidos(String fisioterapeutaApellidos) {
        this.fisioterapeutaApellidos = fisioterapeutaApellidos;
    }

    public String getFisioterapeutaEdad() {
        return fisioterapeutaEdad;
    }

    public void setFisioterapeutaEdad(String fisioterapeutaEdad) {
        this.fisioterapeutaEdad = fisioterapeutaEdad;
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

    public Fisioterapeuta(){

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
