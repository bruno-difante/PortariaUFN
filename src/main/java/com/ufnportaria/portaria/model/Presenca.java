package com.ufnportaria.portaria.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "presencas")
public class Presenca {

    @Id
    private String id;

    private String professorId;
    private String predio;
    private String sala;
    private LocalDateTime horarioRegistro;

    public Presenca(){}

    public Presenca(String professorId, String predio, String sala, LocalDateTime horarioRegistro) {
        this.professorId = professorId;
        this.predio = predio;
        this.sala = sala;
        this.horarioRegistro = horarioRegistro;
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

    public LocalDateTime getHorarioRegistro() {
        return horarioRegistro;
    }

    public void setHorarioRegistro(LocalDateTime horarioRegistro) {
        this.horarioRegistro = horarioRegistro;
    }

    @Override
    public String toString() {
        return "Presenca{" +
                "id='" + id + '\'' +
                ", professorId='" + professorId + '\'' +
                ", predio='" + predio + '\'' +
                ", sala='" + sala + '\'' +
                ", horarioRegistro=" + horarioRegistro +
                '}';
    }
}
