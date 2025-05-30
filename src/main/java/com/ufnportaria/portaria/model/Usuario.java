package com.ufnportaria.portaria.model;

import org.springframework.data.annotation.Id;

public class Usuario {

    @Id
    private String id;

    private String nome;
    private String rfid; //Codigo do cracha
    private String tipo;
    public Usuario() {}

    public Usuario (String id, String nome, String rfid, String tipo) {
        this.nome = nome;
        this.rfid = rfid;
        this.tipo = tipo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRfid() {
        return rfid;
    }

    public void setRfid(String rfid) {
        this.rfid = rfid;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", rfid='" + rfid + '\'' +
                ", tipo='" + tipo + '\'' +
                '}';
    }
}
