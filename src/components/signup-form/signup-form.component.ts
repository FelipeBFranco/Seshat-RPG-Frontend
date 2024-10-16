import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignupService } from '../../services/user/signup/signup.service';

@Component({
  selector: 'app-signup-form',
  template: `
  <div class="loginContent mt-3">
    <div class="formContent">
      <div class="cardForm">
        <form
          method="post"
          action=""
          class="front"
          [formGroup]="signUpForm"
          (ngSubmit)="signupFormSubmit()"
        >
          <div>
            <h2 class="text-center">Registrar-se</h2>
            <div class="inputContent">
              <div class="col">
                <label for="input-nome" class="mb-2 form-label"
                  >Seu Nome</label
                >
                <p>
                  <input
                    pInputText
                    id="input-nome"
                    formControlName="name"
                    type="text"
                    autocomplete="name"
                    [style]="{ width: '100%' }"
                  />
                </p>
              </div>
              <div class="col">
                <label for="input-email" class="mb-2 form-label"
                  >Seu Email</label
                >
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
                <label for="input-senha" class="mb-2 form-label"
                  >Sua Senha</label
                >
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
              <div class="col mb-2">
                <small
                  >Já possui uma conta?
                  <a routerLink="/auth/login" class="">Entrar</a></small
                >
              </div>
            </div>
            <button
              pButton
              pRipple
              style="width: 93%;"
              class="button botaoLogin ml-2 justify-content-center"
              type="submit"
              [disabled]="signUpForm.invalid || isLoading"
            >
              <span *ngIf="!isLoading">Cadastrar-se</span>
              <div
                *ngIf="isLoading"
                class="spinner-border spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styleUrl: './signup-form.component.scss',
  providers: [MessageService, FormBuilder]
})
export class SignupFormComponent {
  toastIsVisible = false;
  isLoading = false;
  signUpForm: FormGroup

  constructor(private signUpService: SignupService, private messageService: MessageService) {
    this.signUpForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
  }

  signupFormSubmit() {
    this.isLoading = true;
    this.signUpForm.disable();
    this.signUpService.signup(this.signUpForm.value.name, this.signUpForm.value.email, this.signUpForm.value.password).subscribe(
      (success: any) => {
        this.messageService.add({ severity: 'success', summary: 'Cadastro efetuado com sucesso!', detail: 'Você será redirecionado à página de login em um instante...', sticky: false });
        this.isLoading = false;
        setTimeout(() => {
          window.location.href = '/player-page';
        }, 1500);
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro ao efetuar cadastro', detail: error.error, sticky: false });
        this.isLoading = false;
        this.signUpForm.enable();
      }
    );
  }
}

