package com.sistema.fisioterapia.model;

import javax.validation.constraints.NotBlank;

public class ChangePassword {

    @NotBlank
    final String password;

    @NotBlank
    final String confirmPassword;
    @NotBlank
    final String tokenPassword;


    public ChangePassword(String password, String confirmPassword, String tokenPassword) {
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.tokenPassword = tokenPassword;
    }

    public String getPassword() {
        return password;
    }



    public String getConfirmPassword() {
        return confirmPassword;
    }



    public String getTokenPassword() {
        return tokenPassword;
    }


}
