import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetManagerComponent } from './components/sheet-manager/sheet-manager.component';
import { CampaingPageComponent } from './components/campaing-page/campaing-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth-screen/auth-screen.module').then(m => m.AuthScreenModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'player-page',
    loadChildren: () => import('./components/player-page/player-page.module').then(m => m.PlayerPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: 'campaing-page',
    loadChildren: () => import('./components/campaing-page/campaing-page.module').then(m => m.CampaingPageModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//localhost:4200/auth/login/lgoin
