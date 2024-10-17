import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../app/shared/services/toast.service';
import { matchPasswordValidator } from '../../app/shared/validators/match-password.validator';
@Component({
  selector: 'app-login-form',
  template: `
    <div class="formContent">
      <div class="cardForm">
        <form
          method="post"
          action=""
          class="flex front align-content-center justify-content-center"
          [formGroup]="resetPasswordForm"
          (ngSubmit)="resetPasswordFormSubmit()"
        >
          <div>
            <p class="text-center titleText">Redefinir senha</p>
            <p class="subtext">
              Sua nova senha não pode ser igual a senha anterior.
            </p>
            <div class="inputContent">
              <div class="col">
                <label for="input-email" class="mb-2 form-label">Informe sua nova senha.</label>
                <p>
                  <p-password
                    type="password"
                    class="inputSenhaForm"
                    formControlName="password"
                    weakLabel="Senha muito fraca"
                    mediumLabel="Senha mediana"
                    strongLabel="Senha forte"
                    promptLabel="Insira sua senha"
                    [toggleMask]="true"
                    [style]="{'width':'100%'}"
                    [inputStyle]="{'width':'100%'}"
                    >
                    <ng-template pTemplate="header">
                      <div class="p-d-flex p-ai-center p-jc-between">
                        <label class="p-mb-0">Nova senha</label>
                      </div>
                    </ng-template>
                    <ng-template pTemplate="footer">
                    <p-divider></p-divider>
                    <p class="p-mb-0">A senha deve conter:</p>
                    <ul class="p-ml-4 p-mt-0 passwordRules">
                      <li> {{ hasMinLength() ? '✅' : '❌' }}  Pelo menos 8 caracteres</li>
                      <li> {{ hasUpperCase() ? '✅' : '❌' }} Uma letra maiúscula</li>
                      <li> {{ hasLowerCase() ? '✅' : '❌' }} Uma letra minúscula</li>
                      <li> {{ hasNumber() ? '✅' : '❌' }} Um número</li>
                      <li> {{ hasSpecialChar() ? '✅' : '❌' }} Um caractere especial</li>
                    </ul>
                    </ng-template>
                  </p-password>
                </p>
              </div>
              <div class="col">
                <label for="input-password" class="mb-2 form-label">Confirme sua nova senha</label>
                <p>
                  <p-password
                    type="password"
                    formControlName="confirmPassword"
                    [toggleMask]="true"
                    [style]="{'width':'100%'}"
                    [inputStyle]="{'width':'100%'}"
                    [feedback]="false"
                    ></p-password>
                </p>
                <div *ngIf="resetPasswordForm.invalid && resetPasswordForm.touched">
                  <p>
                    <small class="passwordError" *ngIf="resetPasswordForm.controls['confirmPassword'].errors?.['required']">A confirmação de senha é necessária.</small>
                  </p>
                  <p>
                    <small class="passwordError" *ngIf="!validatePassword() && !resetPasswordForm.errors?.['passwordsDoNotMatch']">A senha deve seguir todas as regras</small>
                  </p>
                </div>
                <div *ngIf="resetPasswordForm.errors?.['passwordsDoNotMatch'] && resetPasswordForm.controls['confirmPassword'].touched">
                  <small class="passwordError">As senhas precisam ser iguais.</small>
                </div>
              </div>
            </div>
            <button
              pButton
              pRipple
              class="button botaoLogin ml-2 justify-content-center"
              type="submit"
              [disabled]="!validatePassword() || isLoading"
              style="width: 96%;"
            >
              <span *ngIf="!isLoading">Redefinir senha</span>
              <div *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
  `,
  styles: [`
      .subtext {
        font-weight: 500;
        font-size: 0.9rem;
        padding: 1rem;
        border-radius: 25px;
        background-color: rgba(48, 48, 48, 0.494);
      }

      .titleText {
        font-weight: 700;
        font-size: 1.5rem;
      }

      .passwordError {
        color: red;
        font-size: 0.9rem;
      }

      .passwordRules {
        font-size: 0.9rem;
        list-style: none;
      }
    `],
  providers: [FormBuilder]
})
export class ResetPasswordComponent {
  toastIsVisible = false;
  isLoading = false;
  resetPasswordForm: FormGroup

  constructor(private fb: FormBuilder, private toastService: ToastService, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]),
    }, { validators: matchPasswordValidator });
  }

  ngOnInit() {
  }


  resetPasswordFormSubmit() {
    this.isLoading = true;
    this.toastService.showToast('success', 'Senha redefinida com sucesso', 'Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login.');
    this.isLoading = false;
    setTimeout(() => {
      this.navitateToLogin();
    }, 2000);
  }

  navitateToLogin() {
    this.router.navigate(['/login']);
  }

  hasMinLength(): boolean {
    return this.resetPasswordForm.controls['password'].value.length >= 8;
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.resetPasswordForm.controls['password'].value);
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.resetPasswordForm.controls['password'].value);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.resetPasswordForm.controls['password'].value);
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.resetPasswordForm.controls['password'].value);
  }

  validatePassword(): boolean {
    return this.hasMinLength() && this.hasUpperCase() &&
     this.hasLowerCase() && this.hasNumber() &&
     this.hasSpecialChar() && this.resetPasswordForm.controls['password'].value === this.resetPasswordForm.controls['confirmPassword'].value;
  }

}
