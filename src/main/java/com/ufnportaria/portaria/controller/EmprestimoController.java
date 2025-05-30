package com.ufnportaria.portaria.controller;

import com.ufnportaria.portaria.model.Emprestimo;
import com.ufnportaria.portaria.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @PostMapping // Criamos um novo emprestimo
    public Emprestimo registrarEmprestimo(@RequestBody Emprestimo emprestimo){
        emprestimo.setDataEmprestimo(LocalDateTime.now());
        emprestimo.setDataDevolucao(null);
        return emprestimoRepository.save(emprestimo);
    }
    @GetMapping // Listar todos emprestimos
    public List<Emprestimo> listarTodos(){
        return emprestimoRepository.findAll();
    }

    @GetMapping("/{id}") // Buscar empréstimo por ID
    public Optional<Emprestimo> buscarPorId(@PathVariable String id) {
        return emprestimoRepository.findById(id);
    }

    @GetMapping("/professor/{professorId}") // Buscar empréstimos por professor
    public List<Emprestimo> buscarPorProfessor(@PathVariable String professorId) {
        return emprestimoRepository.findByProfessorId(professorId);
    }

    @GetMapping("/abertos") // Vemos os emprestimos em aberto
    public List<Emprestimo> listarAbertos() {
        return emprestimoRepository.findByDataDevolucaoIsNull();
    }

    @PutMapping("/devolver/{id}") // Registro de devolução
    public Emprestimo registrarDevolucao(@PathVariable String id) {
        return emprestimoRepository.findById(id).map(emprestimo -> {
            emprestimo.setDataDevolucao(LocalDateTime.now());
            return emprestimoRepository.save(emprestimo);
        }).orElseThrow(() -> new RuntimeException("Empréstimo não encontrado!"));
    }
}
