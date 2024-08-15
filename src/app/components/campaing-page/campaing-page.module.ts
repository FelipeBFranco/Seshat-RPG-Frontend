import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaingPageComponent } from './campaing-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CampaingPageComponent,
  },
];

@NgModule({
  declarations: [CampaingPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaingPageModule {}
