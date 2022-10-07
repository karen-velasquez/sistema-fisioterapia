package com.sistema.fisioterapia.exceptions;

public class UsuarioNotFoundException extends Exception{

    public UsuarioNotFoundException(){
        super("El usuario con ese username no existe en la base de datos");
    }

    public UsuarioNotFoundException(String mensaje){
        super(mensaje);
    }
}
