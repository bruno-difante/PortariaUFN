package com.ufnportaria.portaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "emprestimos")
public class Emprestimo {

    @Id
    private String id;

    private String professorId;
    private List<String> itensIds;
    private Localizacao localizacao;
    private LocalDateTime dataEmprestimo;
    private LocalDateTime dataDevolucao; // null até devolução

    public Emprestimo() {}

    public Emprestimo(String professorId, List<String> itensIds, Localizacao localizacao, LocalDateTime dataEmprestimo) {
        this.professorId = professorId;
        this.itensIds = itensIds;
        this.localizacao = localizacao;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProfessorId() {
        return professorId;
    }

    public void setProfessorId(String professorId) {
        this.professorId = professorId;
    }

    public List<String> getItensIds() {
        return itensIds;
    }

    public void setItensIds(List<String> itensIds) {
        this.itensIds = itensIds;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }

    public LocalDateTime getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDateTime dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDateTime getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDateTime dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    @Override
    public String toString() {
        return "Emprestimo{" +
                "id='" + id + '\'' +
                ", professorId='" + professorId + '\'' +
                ", itensIds=" + itensIds +
                ", localizacao='" + localizacao + '\'' +
                ", dataEmprestimo=" + dataEmprestimo +
                ", dataDevolucao=" + dataDevolucao +
                '}';
    }
}
