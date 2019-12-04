import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectBrowseComponent } from './project-browse/project-browse.component';
import {ProjectShowComponent} from './project-show/project-show.component';

const routes: Routes = [
  {
    path: '', component: ProjectBrowseComponent
  },
  {
    path: ':slug', component: ProjectShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
