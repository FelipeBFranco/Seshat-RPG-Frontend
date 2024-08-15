import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetManagerComponent } from './components/sheet-manager/sheet-manager.component';
import { CampaingPageComponent } from './components/campaing-page/campaing-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'sheet-manager',
    component: SheetManagerComponent
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
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
