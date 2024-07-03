import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPageComponent } from './player-page.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PlayerPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlayerPageModule { }
