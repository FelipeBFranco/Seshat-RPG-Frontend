import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/user/login/login.service';
import { ToastService } from '../../app/shared/services/toast.service';
@Component({
  selector: 'app-login-form',
  template: `
    <div class="formContent">
      <div class="cardForm">
        <form
          method="post"
          action=""
          class="flex front align-content-center justify-content-center"
          [formGroup]="loginForm"
          (ngSubmit)="loginFormSubmit()"
        >
          <div>
            <h2 class="text-center">Login</h2>
            <div class="inputContent align-content-center justify-content-center">
              <div class="col" style="min-width: 12%">
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
                    type="password"
                    formControlName="password"
                    autocomplete="current-password"
                    [feedback]="false"
                    [toggleMask]="true"
                    [style]="{'width':'100%'}"
                    [inputStyle]="{'width':'100%'}"
                  ></p-password>
                </p>
              </div>
              <div class="ml-2">
                <small>Não possui uma conta? <a href="/auth/signup" class="">Cadastre-se</a></small>
                <p>
                  <small>Esqueceu a senha? <a href="/auth/forgot-password" class="esqueceu-text">Recuperar</a></small>
                </p>
              </div>
            </div>
            <button
              pButton
              pRipple
              class="button botaoLogin ml-2 justify-content-center"
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              style="width: 93%;"
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
  providers: [FormBuilder]
})
export class LoginFormComponent {
  toastIsVisible = false;
  isLoading = false;
  loginForm: FormGroup

  constructor(private LoginService: LoginService, private toastService: ToastService) {
    this.loginForm = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    })
  }

  ngOnInit() {
  }

  // Login com validação de token JWT e redirecionamento
  loginFormSubmit() {
    // Requisicao no service de login
    this.loginForm.value.email = this.loginForm.value.email.trim();
    this.isLoading = true;
    this.loginForm.disable();
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (success: any) => {
        localStorage.setItem('token', `${(success as any)['token']}`);
        localStorage.setItem('name', `${(success as any)['name']}`);
        localStorage.setItem('id', `${(success as any)['id']}`);
        this.toastService.showSuccessToast('Login efetuado com sucesso', 'Você será redirecionado em breve');
        // Redirecionar para a página do usuário (a verificação de rule do token será feita posteriormente no servidor para a diferenciação de rotas)
        this.isLoading = false;
        setTimeout(() => {
          window.location.href = '/select-campaign';
        }, 1500);
      },
      (error: any) => {
        // Se a requisição falhar, exibir mensagem de erro
        this.toastService.showToast('Erro', 'Email ou senha incorretos', 'error');
        console.log('deu ruim');
        this.isLoading = false;
        this.loginForm.enable();
      }
    );
  }

}
