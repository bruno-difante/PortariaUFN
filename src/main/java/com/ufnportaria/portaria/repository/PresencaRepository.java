package com.ufnportaria.portaria.repository;

import com.ufnportaria.portaria.model.Presenca;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PresencaRepository extends MongoRepository<Presenca, String> {
    List<Presenca> findByProfessorId(String professorId);
}
