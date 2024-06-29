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
    email: new FormControl(''),
    password: new FormControl(''),
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

  // Login com validação de token JWT e redirecionamento
  enviarRequisicaoDeLogin() {
    this.LoginService.login(this.formularioLogin.value.email, this.formularioLogin.value.password).subscribe(
      (success) => {
        localStorage.setItem('token', `${(success as any)['token']}`);
        localStorage.setItem('name', `${(success as any)['name']}`);
        localStorage.setItem('id', `${(success as any)['id']}`);
      }
    
    );
  }
}
