import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss'
})
export class PlayerPageComponent implements OnInit {

  loggedPlayerName: string | null = null;
  loggedPlayerId: number | null = null;

  constructor() { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedPlayerName = localStorage.getItem('name');
      this.loggedPlayerId = Number(localStorage.getItem('id'));
    }
  }


}
