package com.ufnportaria.portaria.controller;

import com.ufnportaria.portaria.model.Usuario;
import com.ufnportaria.portaria.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        return usuarioRepository.save(usuario);
    }
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable String id) {
        return usuarioRepository.findById(id);
    }

    @GetMapping("/rfid/{rfid}")
    public Optional<Usuario> buscarPorRfid(@PathVariable String rfid) {
        return usuarioRepository.findByRfid(rfid);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable String id) {
        usuarioRepository.deleteById(id);
    }
}
