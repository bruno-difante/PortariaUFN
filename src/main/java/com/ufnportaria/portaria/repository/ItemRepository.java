package com.ufnportaria.portaria.repository;

import com.ufnportaria.portaria.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends MongoRepository<Item, String> { //Aqui criamos o banco no Mongo
    // Usaremos por qual metodo de busca vamos optar
    Optional<Item> findByNome(String nome);  // Buscar por nome
    List<Item> findByTipo (String tipo); // Buscar por tipo
    List<Item> findByAtivoTrue(); // Buscar por ativo ou não ativo
}
