import { Component } from '@angular/core';

@Component({
  selector: 'app-sheet-manager',
  templateUrl: './sheet-manager.component.html',
  styleUrl: './sheet-manager.component.scss'
})
export class SheetManagerComponent {

  players: any[] = [
    {
      nome: 'Nero',
      personagens: [
        { nome: 'Gandalf', raca: 'Humano', classe: 'Mago' },
        { nome: 'Frodo', raca: 'Hobbit', classe: 'Ladino' }
      ]
    },
    {
      nome: 'Vitão',
      personagens: [
        { nome: 'Legolas', raca: 'Elfo', classe: 'Arqueiro' },
        { nome: 'Aragorn', raca: 'Humano', classe: 'Guerreiro' }
      ]
    }
  ];

  playerSelected: any = 'Nome Grande da Porra pra Teste de Tamanho de Texto Grande';
}
