import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerCharacterService } from './service/player-character.service';
import { Character } from '../shared/models/character.model';
import { Sidebar } from 'primeng/sidebar';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss'
})
export class PlayerPageComponent implements OnInit {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  loggedPlayerName: string | null = null;
  loggedPlayerId: number | null = null;
  sidebarVisible: boolean = false;

  playerCharacters: Character[] = [];
  selectedCharacter!: Character

  constructor(private playerCharacter: PlayerCharacterService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedPlayerName = localStorage.getItem('name');
      this.loggedPlayerId = Number(localStorage.getItem('id'));
    }

    if (this.loggedPlayerId != null) {
      this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
        this.playerCharacters = data;
      });
    }
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
  }

  closeCallback(e: any): void {
    this.sidebarVisible = e;
  }

  dynamicWidth(value: number): string {
    const dynamicWidth = (value / 100) * 100;
    return `${dynamicWidth}%`;
  }

}
