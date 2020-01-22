import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Project, ProjectCell, ProjectRow} from '../../types/project.model';
import { ProjectService } from '../project.service';
import {SeoService} from '../../services/seo.service';
import {MasonryService} from '../../services/masonry.service';
import {Image} from '../../types/image.model';

@Component({
  selector: 'app-project-browse',
  templateUrl: './project-browse.component.html',
  styleUrls: ['./project-browse.component.scss']
})
export class ProjectBrowseComponent implements OnInit, OnDestroy {
  projectRows: ProjectRow[];
  subscription: Subscription;

  constructor(public projectService: ProjectService, private seo: SeoService, private masonry: MasonryService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Posters',
      description: 'A list of posters from all PosterSpy artists'
    });
    this.subscription = this.projectService
        .getProjects()
        .subscribe(projects => {
          const images  = projects.map((project, index) => {
            let image = project.thumbnailImage ? project.thumbnailImage : project.coverImage;
            image = { index, ...image };

            return image;
          });

          const imageRows = this.masonry.calculateLayoutForContainerWidth(images, window.innerWidth, window.innerHeight);
          this.projectRows = imageRows.map((imageRow: Array<object>) => {
              return imageRow.map((image: Image, imageIndex: number) => {
                  return {
                      index: imageIndex,
                      image,
                      project: projects[image.index]
                  };
              });
          });
          console.log(this.projectRows);
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
