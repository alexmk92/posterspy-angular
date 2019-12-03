import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { Section } from '../project.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() section: Section;
  @Input() isEditing: boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  widgetDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.section.widgets, event.previousIndex, event.currentIndex);
    this.projectService.updateWidgets(this.section.id, this.section);
  }

}
