import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Section } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-browse',
  templateUrl: './project-browse.component.html',
  styleUrls: ['./project-browse.component.scss']
})
export class ProjectBrowseComponent implements OnInit, OnDestroy {
  sections: Section[];
  subscription: Subscription;

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    this.subscription = this.projectService
        .getUserProjects()
        .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
