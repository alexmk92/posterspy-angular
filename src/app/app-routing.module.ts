import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './user/auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    // Lazy load the route so we can reduce module bundle size
    path: 'login',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule),
  },
  {
    path: 'poster/create',
    loadChildren: () => import('./portfolio-editor/portfolio-editor.module').then(module => module.PortfolioEditorModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
