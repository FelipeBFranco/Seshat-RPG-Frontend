import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerPageComponent } from './player-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

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
    PanelModule,
    ButtonModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    ProgressBarModule,
    ToastModule,
    DialogModule
  ],
  exports: [RouterModule],
})
export class PlayerPageModule { }
