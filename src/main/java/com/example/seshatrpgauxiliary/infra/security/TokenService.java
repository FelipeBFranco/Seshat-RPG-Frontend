package com.example.seshatrpgauxiliary.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.seshatrpgauxiliary.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    //Essa parte será modificada no futuro para não expor os dados no git.

    @Value("${jwt.secret}")
    private String secret;


    public String geradorDeToken(Usuario usuario) {
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("SeshatRpgAuxiliary")
                    .withSubject(usuario.getEmail())
                    .withExpiresAt(this.geradorDeDataDeExpiracao())
                    .sign(algoritimo);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro enquanto estava autenticando!");
        }
    }

    public String validadorDeToken(String token) {
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                    .withIssuer("SeshatRpgAuxiliary")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token inválido!");
        }
    }

    private Instant geradorDeDataDeExpiracao() {
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
    }
}
