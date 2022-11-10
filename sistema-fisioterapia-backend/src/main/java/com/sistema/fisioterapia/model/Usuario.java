package com.sistema.fisioterapia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sistema.fisioterapia.configuration.Authority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuarioId;

    private String username;
    private String password;
    private String tokenpassword;
    private String nombres;
    private String apellidos;

    private String correo;

    private String fechaNac;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "usuario")
    @JsonIgnore
    private Set<UsuarioRol> usuarioRoles = new HashSet<>();

    /*uniendolo con la tabla de sesion*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "Id")
    @JsonIgnore
    private Set<Sesion> pacienteId = new HashSet<>();


    /*one to many de lesiones*/
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "pacienteId")
    @JsonIgnore
    private Set<Lesion> lesionId = new HashSet<>();


    public Usuario(){

    }

    public Usuario(Long usuarioId, String username, String password, String nombres, String apellidos, String correo, String fechaNac, String tokenpassword) {
        this.usuarioId = usuarioId;
        this.username = username;
        this.password = password;
        this.tokenpassword = tokenpassword;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.fechaNac = fechaNac;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsername() {
        return username;
    }

    /*Spring Web Security----------*/
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
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> autoridades = new HashSet<>();
        this.usuarioRoles.forEach(usuarioRol -> {
            autoridades.add(new Authority(usuarioRol.getRol().getRolNombre()));
        });
        return autoridades;
    }

    /*--------------------------------*/
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getTokenpassword() {
        return tokenpassword;
    }

    public void setTokenpassword(String tokenpassword) {
        this.tokenpassword = tokenpassword;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getFechaNac() {
        return fechaNac;
    }

    public void setFechaNac(String fechaNac) {
        this.fechaNac = fechaNac;
    }


    public Set<UsuarioRol> getUsuarioRoles() {
        return usuarioRoles;
    }

    public void setUsuarioRoles(Set<UsuarioRol> usuarioRoles) {
        this.usuarioRoles = usuarioRoles;
    }



    public Set<Sesion> getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Set<Sesion> pacienteId) {
        this.pacienteId = pacienteId;
    }



    public Set<Lesion> getLesionId() {
        return lesionId;
    }

    public void setLesionId(Set<Lesion> lesionId) {
        this.lesionId = lesionId;
    }
}
