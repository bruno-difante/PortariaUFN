package com.ufnportaria.portaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "itens")
public class Item {

    @Id
    private String id;

    private String nome;
    private String tipo;
    private String descricao;
    private int quantidadeTotal;
    private int quantidadeAtual;
    private String sala;
    private String predio;
    private boolean ativo;

    private Item() {}

    private Item(String id, String tipo, String descricao, int quantidadeTotal, int quantidadeAtual, String sala, String predio, boolean ativo) {
        this.tipo = tipo;
        this.descricao = descricao;
        this.quantidadeTotal = quantidadeTotal;
        this.quantidadeAtual = quantidadeAtual;
        this.ativo = ativo;
        this.sala = sala;
        this.predio = predio;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public void setQuantidadeTotal(int quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    public int getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(int quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
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
        return "Item{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", tipo='" + tipo + '\'' +
                ", descricao='" + descricao + '\'' +
                ", quantidadeTotal=" + quantidadeTotal +
                ", quantidadeAtual=" + quantidadeAtual +
                ", sala='" + sala + '\'' +
                ", predio='" + predio + '\'' +
                ", ativo=" + ativo +
                '}';
    }
}
