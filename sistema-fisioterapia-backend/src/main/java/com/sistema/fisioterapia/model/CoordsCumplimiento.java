package com.sistema.fisioterapia.model;

public class CoordsCumplimiento {
    private String x;
    private Float y;

    public CoordsCumplimiento(String x, Float y){
        this.x = x;
        this.y = y;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public Float getY() {
        return y;
    }

    public void setY(Float y) {
        this.y = y;
    }
}
