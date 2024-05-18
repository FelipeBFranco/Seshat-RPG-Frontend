package com.example.seshatrpgauxiliary.controllers;


import com.example.seshatrpgauxiliary.domain.usuario.Usuario;
import com.example.seshatrpgauxiliary.dto.LoginRequestDTO;
import com.example.seshatrpgauxiliary.dto.RegisterRequestDTO;
import com.example.seshatrpgauxiliary.dto.ResponseDTO;
import com.example.seshatrpgauxiliary.infra.security.TokenService;
import com.example.seshatrpgauxiliary.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        Usuario usuario = usuarioRepository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (passwordEncoder.matches(body.senha(), usuario.getSenha())) {
            String token = tokenService.geradorDeToken(usuario);
            return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token));
        }
        return ResponseEntity.badRequest().body("Senha inválida");
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(body.email());
        if (usuario.isPresent()) {
            Usuario novoUsuario = new Usuario();
            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setNome(body.nome());
            this.usuarioRepository.save(novoUsuario);

                String token = tokenService.geradorDeToken(novoUsuario);
                return ResponseEntity.ok(new ResponseDTO(novoUsuario.getNome(), token));

        }
            return ResponseEntity.badRequest().body("Usuário já cadastrado");

    }

}
