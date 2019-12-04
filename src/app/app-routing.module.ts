import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './user/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    // Lazy load the route so we can reduce module bundle size
    path: 'login',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
