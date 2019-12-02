import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectBrowseComponent } from './project-browse/project-browse.component';

const routes: Routes = [
  {
    path: '', component: ProjectBrowseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
