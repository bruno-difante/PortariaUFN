package com.ufnportaria.portaria.repository;

import com.ufnportaria.portaria.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByRfid(String rfid);
}
