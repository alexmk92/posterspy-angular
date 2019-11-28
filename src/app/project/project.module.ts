import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {ProjectRoutingModule} from './project-routing.module';
import { SectionComponent } from './section/section.component';
import { SectionListComponent } from './section-list/section-list.component';


@NgModule({
  declarations: [SectionComponent, SectionListComponent],
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
