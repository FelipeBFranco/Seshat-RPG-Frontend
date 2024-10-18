import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pages',
  template: `
    <div class="app">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class PagesComponent implements OnInit {
  title = 'RPGSheetBR';
  constructor() { }
  ngOnInit() {

  }

}
