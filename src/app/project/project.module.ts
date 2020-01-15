import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SectionComponent } from './section/section.component';
import { ProjectShowComponent } from './project-show/project-show.component';
import { ProjectBrowseComponent } from './project-browse/project-browse.component';
import { ProjectCardComponent } from './project-card/project-card.component';


@NgModule({
  declarations: [SectionComponent, ProjectShowComponent, ProjectBrowseComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ]
})
export class ProjectModule { }
