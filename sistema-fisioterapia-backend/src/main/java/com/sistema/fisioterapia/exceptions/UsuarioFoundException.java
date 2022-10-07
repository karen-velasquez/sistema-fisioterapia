package com.sistema.fisioterapia.exceptions;

public class UsuarioFoundException extends Exception {

    public UsuarioFoundException(){
        super("El usuario con ese username ya existe en la base de datos");
    }

    public UsuarioFoundException(String mensaje){
        super(mensaje);
    }

}
