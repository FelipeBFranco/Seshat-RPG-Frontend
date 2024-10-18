import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServidorService {

  // Configuração de URL para o servidor de login
  public readonly frontEndServerLoginUrl: string = 'http://google.com'
  public readonly backEndServerLoginUrl: string = 'http://localhost:8080'

  // Configuração de URL para o servidor de backend
  public readonly applicationBackEndUrl: string = 'http://localhost:8080';

  constructor() { }

  // Retorna a URL do servidor de login
  public getServidor(): string {
    return this.applicationBackEndUrl;
  }
}
