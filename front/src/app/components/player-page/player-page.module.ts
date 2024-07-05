import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPageComponent } from './player-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';


const routes: Routes = [
  {
    path: '',
    component: PlayerPageComponent
  }
];

@NgModule({
  declarations: [PlayerPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PanelModule
  ],
  exports: [RouterModule],
})
export class PlayerPageModule { }
