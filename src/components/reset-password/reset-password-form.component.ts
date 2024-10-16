import { Router } from '@angular/router';
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
          [formGroup]="resetPasswordForm"
          (ngSubmit)="resetPasswordFormSubmit()"
        >
          <div>
            <h2 class="text-center">Redefinir senha</h2>
            <h4 class="subtext">
              Sua nova senha não pode ser igual a senha anterior.
            </h4>
            <div class="inputContent">
              <div class="col">
                <label for="input-email" class="mb-2 form-label">Informe sua nova senha.</label>
                <p>
                  <p-password formControlName="password" weakLabel="Senha muito fraca" mediumLabel="Senha mediana" strongLabel="Senha forte" promptLabel="Insira sua senha" [toggleMask]="true">
                    <ng-template pTemplate="header">
                      <div class="p-d-flex p-ai-center p-jc-between">
                        <label class="p-mb-0">Nova senha</label>
                      </div>
                    </ng-template>
                    <ng-template pTemplate="footer">
                    <p-divider></p-divider>
                    <p class="p-mb-0">A senha deve conter:</p>
                    <ul class="p-ml-4 p-mt-0">
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
                  <p-password formControlName="password"   [feedback]="false" [toggleMask]="true"></p-password>
                </p>
              </div>
            </div>
            <button
              pButton
              pRipple
              class="button botaoLogin ml-2 justify-content-center"
              type="submit"
              [disabled]="resetPasswordForm.invalid || isLoading"
              style="width: 93%;"
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
        font-weight: semibold;
        padding: 1rem;
        border-radius: 25px;
        background-color: rgba(48, 48, 48, 0.494);
        max-width: 280px;
      }
    `],
  providers: [FormBuilder]
})
export class ResetPasswordComponent {
  toastIsVisible = false;
  isLoading = false;
  resetPasswordForm: FormGroup

  constructor(private toastService: ToastService, private router: Router) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
    })
  }

  ngOnInit() {
  }


  resetPasswordFormSubmit() {
    this.isLoading = true;
    this.toastService.showToast('success', 'Senha redefinida com sucesso', 'Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login.');
    this.isLoading = false;
    setTimeout(() => {
      this.router.navigate(['/login']);
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
}
