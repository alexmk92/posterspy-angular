import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../types/project.model';
import {Image} from '../../types/image.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Input() imageProps: Image;

  constructor() { }

  ngOnInit() {}

}
