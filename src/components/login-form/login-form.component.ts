import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/user/login/login.service';
@Component({
  selector: 'app-login-form',
  template: `
    <div class="formContent">
      <div class="cardForm">
        <form
          method="post"
          action=""
          class="front"
          [formGroup]="formularioLogin"
          (ngSubmit)="enviarRequisicaoDeLogin()"
        >
          <div>
            <h2 class="text-center">Login</h2>
            <div class="inputContent">
              <div class="col">
                <label for="input-email" class="mb-2 form-label">Email do Usuário</label>
                <p>
                  <input
                    pInputText
                    id="input-email"
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                    [style]="{ width: '100%' }"
                  />
                </p>
              </div>
              <div class="col">
                <label for="input-senha" class="mb-2 form-label">Senha</label>
                <p>
                  <p-password
                    id="input-senha"
                    formControlName="password"
                    autocomplete="current-password"
                    [feedback]="false"
                    [toggleMask]="true"
                  ></p-password>
                </p>
              </div>
              <div>
                <small>Não possui uma conta? <a routerLink="/auth/signup" class="">Cadastre-se</a></small>
                <p>
                  <small>Esqueceu a senha? <a class="esqueceu-text">Recuperar</a></small>
                </p>
              </div>
            </div>
            <button
              class="button botaoLogin"
              type="submit"
              [disabled]="formularioLogin.invalid || isLoading"
            >
              <span *ngIf="!isLoading">Login</span>
              <div *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
  `,
  styleUrls: ['./login-form.component.scss'],
  providers: [FormBuilder, MessageService]
})
export class LoginFormComponent {
  toastIsVisible = false;
  isLoading = false;
  formularioLogin: FormGroup
  formularioCadastro: FormGroup

  constructor(private LoginService: LoginService, private messageService: MessageService) {
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
  }

  // Login com validação de token JWT e redirecionamento
  enviarRequisicaoDeLogin() {
    // Requisicao no service de login
    this.formularioLogin.value.email = this.formularioLogin.value.email.trim();
    this.isLoading = true;
    this.formularioLogin.disable();
    this.LoginService.login(this.formularioLogin.value.email, this.formularioLogin.value.password).subscribe(
      (success: any) => {
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
