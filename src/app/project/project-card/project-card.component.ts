import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../types/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
    this.project.
  }

}
