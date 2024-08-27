import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignupService } from './service/singup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [FormBuilder, MessageService]
})
export class SignupComponent {
  toastIsVisible = false;
  isLoading = false;
  formularioCadastro: FormGroup

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private signUpService: SignupService, private messageService: MessageService) {

    this.formularioCadastro = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [Validators.required]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit() {
  }

  // Cadastro com validação de token JWT e redirecionamento
  enviarRequisicaoDeCadastro() {
    this.isLoading = true;
    this.formularioCadastro.disable();
    this.signUpService.signup(this.formularioCadastro.value.name, this.formularioCadastro.value.email, this.formularioCadastro.value.password).subscribe(
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
        this.formularioCadastro.enable();
      }
    );
  }
}
