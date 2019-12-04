import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Observable, Subscription} from 'rxjs';
import {Project, Section} from '../project.model';
import { ProjectService } from '../project.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss']
})
export class ProjectShowComponent implements OnInit, OnDestroy {
  projectSlug: string;
  project: Observable<any>;
  isEditing: boolean;
  sections: Section[];
  subscription: Subscription;

  constructor(
      private route: ActivatedRoute,
      public projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectSlug = this.route.snapshot.paramMap.get('slug');
    this.project = this.projectService.getProjectBySlug(this.projectSlug);
    this.isEditing = !!(this.route.snapshot.paramMap.get('edit'));
    this.subscription = this.projectService
        .getProjectSections('QKJr8qkmIalsCLkchAt9')
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
