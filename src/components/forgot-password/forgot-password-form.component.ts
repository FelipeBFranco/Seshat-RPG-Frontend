import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../app/shared/services/toast.service';
@Component({
  selector: 'app-login-form',
  template: `
    <div class="formContent flex justify-content-center">
      <div class="cardForm">
        <form
          method="post"
          action=""
          class="front"
          [formGroup]="forgotPasswordForm"
          (ngSubmit)="forgotPasswordFormSubmit()"
        >
          <div>
            <h2 class="text-center">Esqueci minha senha</h2>
            <h4 class="subtext">
              Esqueceu sua senha? Não se preocupe! Informe seu email e enviaremos um link para você redefiní-la.
            </h4>
            <div class="inputContent">
              <div class="col">
                <label for="input-email" class="mb-2 form-label">Informe o Email da conta</label>
                <p>
                  <input
                    pInputText
                    id="input-email"
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                    pTooltip="Insira o email utilizado na hora da criação da conta"
                    tooltipPosition="right"
                    [style]="{ width: '100%' }"
                    placeholder="Informe seu Email"
                  />
                </p>
              </div>
            </div>
            <button
              pButton
              pRipple
              class="button botaoLogin ml-2 justify-content-center"
              type="submit"
              [disabled]="forgotPasswordForm.invalid || isLoading"
              style="width: 93%;"
            >
              <span *ngIf="!isLoading">Enviar Email</span>
              <div *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./forgot-password-form.component.scss'],
  providers: [FormBuilder]
})
export class ForgotPasswordComponent {
  toastIsVisible = false;
  isLoading = false;
  forgotPasswordForm: FormGroup
  sentEmail = false;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  forgotPasswordFormSubmit(): void {
    this.isLoading = true;
    this.toast.showSuccessToast('Email enviado', 'Se o email informado estiver cadastrado, você receberá um email com as instruções para redefinir sua senha.');
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    return;
  }
}
