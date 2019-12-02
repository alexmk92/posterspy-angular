import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Section } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss']
})
export class ProjectShowComponent implements OnInit, OnDestroy {
  isEditing: boolean;
  sections: Section[];
  subscription: Subscription;

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    this.subscription = this.projectService
        .getProjectSections('someId')
        .subscribe(sections => this.sections = sections);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.projectService.sortSections(this.sections);
  }

}
