import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-project-browse',
  templateUrl: './project-browse.component.html',
  styleUrls: ['./project-browse.component.scss']
})
export class ProjectBrowseComponent implements OnInit, OnDestroy {
  projects: Project[];
  subscription: Subscription;

  constructor(public projectService: ProjectService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Posters',
      description: 'A list of posters from all PosterSpy artists'
    });
    this.subscription = this.projectService
        .getProjects()
        .subscribe(projects => this.projects = projects);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
