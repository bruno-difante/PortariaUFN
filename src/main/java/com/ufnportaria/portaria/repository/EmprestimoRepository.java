package com.ufnportaria.portaria.repository;

import com.ufnportaria.portaria.model.Emprestimo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmprestimoRepository extends MongoRepository<Emprestimo, String> {
    List<Emprestimo> findByProfessorId(String professorId); // Codigo do professor
    List<Emprestimo> findByDataDevolucaoIsNull(); // Emprestimos em aberto
}
