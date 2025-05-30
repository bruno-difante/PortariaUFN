package com.ufnportaria.portaria.controller;

import com.ufnportaria.portaria.model.Item;
import com.ufnportaria.portaria.model.Usuario;
import com.ufnportaria.portaria.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/itens")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping // Mapeamos para criar o item
    public Item save(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping // Listagem dos itens
    public List<Item> listarItem() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}") // Buscamos pelo ID
    public Optional<Item> buscarPorId(@PathVariable String id) {
        return itemRepository.findById(id);
    }

    @GetMapping("/nome/{nome}")  // Buscamos por nome (colocamos duas vezes pois uma é como esta no banco e outra na classe)
    public Optional<Item> buscarPorNome(@PathVariable String nome) {
        return itemRepository.findByNome(nome);
    }

    @GetMapping("/ativos") // Buscamos pelos itens ativos
    public List<Item> buscarPorAtivos() {
        return itemRepository.findByAtivoTrue();
    }

    @GetMapping ("/tipo/{tipo}") // Buscamos por tipo
    public List<Item> buscarPorTipo(@PathVariable String tipo) {
        return itemRepository.findByTipo(tipo);
    }


    @PutMapping("/{id}")     // Atualizamos os itens que existem já!
    public Item atualizarItem(@PathVariable String id, @RequestBody Item itemAtualizado) {
        return itemRepository.findById(id).map(item -> {
           item.setNome(itemAtualizado.getNome());
           item.setTipo(itemAtualizado.getTipo());
           item.setDescricao(itemAtualizado.getDescricao());
           item.setQuantidadeTotal(itemAtualizado.getQuantidadeTotal());
           item.setQuantidadeAtual(itemAtualizado.getQuantidadeAtual());
           item.setAtivo(itemAtualizado.isAtivo());
           return itemRepository.save(item);
        }).orElseGet(() -> {
            itemAtualizado.setId(id);
            return itemRepository.save(itemAtualizado);
        });
    }

    @DeleteMapping("/{id}") // Delete do item
    public void deletarItem(@PathVariable String id) {
        itemRepository.deleteById(id);
    }
}
