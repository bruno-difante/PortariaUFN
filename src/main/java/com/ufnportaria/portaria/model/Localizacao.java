package com.ufnportaria.portaria.model;

public class Localizacao {
    private String predio;
    private String sala;

    public Localizacao(){}

    public Localizacao(String predio, String sala){
        this.predio = predio;
        this.sala = sala;
    }

    public String getPredio() {
        return predio;
    }

    public void setPredio(String predio) {
        this.predio = predio;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    @Override
    public String toString() {
        return "Localizacao{" +
                "predio='" + predio + '\'' +
                ", sala='" + sala + '\'' +
                '}';
    }
}
