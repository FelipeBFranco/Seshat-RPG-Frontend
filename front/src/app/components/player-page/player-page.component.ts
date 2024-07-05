import { Component, OnInit } from '@angular/core';
import { PlayerCharacterService } from './service/player-character.service';
import { Character } from '../shared/models/character.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss'
})
export class PlayerPageComponent implements OnInit {

  loggedPlayerName: string | null = null;
  loggedPlayerId: number | null = null;

  playerCharacters: Character[] = [];

  constructor(private playerCharacter: PlayerCharacterService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedPlayerName = localStorage.getItem('name');
      this.loggedPlayerId = Number(localStorage.getItem('id'));
    }

    if(this.loggedPlayerId != null) {
      this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
        this.playerCharacters = data;
      });
    }
  }


}
