import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder, MessageService]
})
export class LoginComponent implements OnInit {
  toastIsVisible = false;
  isLoading = false;
  formularioLogin: FormGroup
  formularioCadastro: FormGroup

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private LoginService: LoginService, private messageService: MessageService) {
    this.formularioLogin = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    })
    this.formularioCadastro = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
    this.formularioCadastro = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
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
    // Requisicao no service de login
    this.formularioLogin.value.email = this.formularioLogin.value.email.trim();
    this.isLoading = true;
    this.formularioLogin.disable();
    this.LoginService.login(this.formularioLogin.value.email, this.formularioLogin.value.password).subscribe(
      (success) => {
        localStorage.setItem('token', `${(success as any)['token']}`);
        localStorage.setItem('name', `${(success as any)['name']}`);
        localStorage.setItem('id', `${(success as any)['id']}`);
        this.messageService.add({ severity: 'success', summary: 'Login efetuado com sucesso!', detail: 'Você será redirecionado à página em um instante...', sticky: false });
        // Redirecionar para a página do usuário (a verificação de rule do token será feita posteriormente no servidor para a diferenciação de rotas)
        this.isLoading = false;
        setTimeout(() => {
          window.location.href = '/player-page';
        }, 3000);
      },
      (error: any) => {
        // Se a requisição falhar, exibir mensagem de erro
        this.messageService.add({ severity: 'error', summary: 'Erro ao efetuar login', detail: 'Verifique suas credenciais e tente novamente.', sticky: false });
        this.isLoading = false;
        this.formularioLogin.enable();
      }
    );
  }
}
