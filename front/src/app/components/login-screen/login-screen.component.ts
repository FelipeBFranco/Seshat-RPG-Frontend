import { LoginService } from './service/login.service';
import { FormularioLogin } from './../shared/models/formularioLogin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from '../shared/services/token.service';
import { ServidorService } from '../shared/services/servidor.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
  animations: []
})
export class LoginScreenComponent implements OnInit {

  formularioLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private tokenService: TokenService, private servidorService: ServidorService, private LoginService: LoginService) {

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addEventListeners();
    }
  }

  private addEventListeners() {
    const card = document.querySelector('.cardForm');
    const entrarText = document.querySelector('.entrar-text');
    const cadastrarText = document.querySelector('.cadastrar-text');

    const flipCard = () => {
      if (card) {
        card.classList.toggle('is-flipped');
      }
    };

    if (entrarText) {
      entrarText.addEventListener('click', flipCard);
    }
    if (cadastrarText) {
      cadastrarText.addEventListener('click', flipCard);
    }
  }

  enviarRequisicaoLogin() {
    if (this.formularioLogin.valid) {
      const dadosLogin: FormularioLogin = this.formularioLogin.value;
      console.log(dadosLogin);
    } else {
      this.formularioLogin.markAllAsTouched();
    }
  }

  // Login com validação de token JWT e redirecionamento
  enviarRequisicaoDeLogin() {
    // Requisicao no service
    this.LoginService.loginRequest(this.formularioLogin.value.email, this.formularioLogin.value.senha).subscribe(
      (success) => {
        // Se a requisição for bem sucedida, armazenar o token no localStorage
        localStorage.setItem('token', `${(success as any)['token']}`);
      });
  }
}
