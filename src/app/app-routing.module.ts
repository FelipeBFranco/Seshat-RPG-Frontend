import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: '**', redirectTo: 'auth' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//localhost:4200/auth/login/lgoin
