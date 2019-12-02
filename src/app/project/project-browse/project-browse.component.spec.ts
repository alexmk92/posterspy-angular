import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBrowseComponent } from './project-browse.component';

describe('ProjectBrowseComponent', () => {
  let component: ProjectBrowseComponent;
  let fixture: ComponentFixture<ProjectBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
