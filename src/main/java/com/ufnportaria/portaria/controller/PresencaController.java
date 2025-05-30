package com.ufnportaria.portaria.controller;

import com.ufnportaria.portaria.model.Presenca;
import com.ufnportaria.portaria.repository.PresencaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/presencas")
public class PresencaController {

    @Autowired
    private PresencaRepository presencaRepository;

    @PostMapping
    public Presenca registrarPresenca(@RequestBody Presenca presenca) {
        presenca.setHorarioRegistro(LocalDateTime.now());
        return presencaRepository.save(presenca);
    }

    @GetMapping
    public List<Presenca> listarTodas() {
        return presencaRepository.findAll();
    }

    @GetMapping("/professor/{professorId}")
    public List<Presenca> listarPorProfessor(@PathVariable String professorId) {
        return presencaRepository.findByProfessorId(professorId);
    }
}
