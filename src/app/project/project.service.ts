import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Project, Section, Tag } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  /**
   * Creates a new project for the current user
   */
  async createProject(data: Project) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('projects').add({
      ...data,
      uid: user.uid,
      sections: [],
      tags: [],
    });
  }

  /**
   * Deletes the project for the current user.
   *
   * @param projectId
   */
  deleteProject(projectId: string) {
    return this.db
        .collection('projects')
        .doc(projectId)
        .delete();
  }

  /**
   * Updates the details of a given project.
   *
   * @param projectId
   * @param data
   */
  updateDetails(projectId: string, data: Project) {
    return this.db
        .collection('projects')
        .doc(projectId)
        .update({ ...data });
  }

    /**
     * Updates the details of a given project.
     *
     * @param projectId
     * @param data
     */
    updateWidgets(sectionId: string, data: Section) {
        return this.db
            .collection('sections')
            .doc(sectionId)
            .update({ ...data });
    }

  /**
   * Remove a specific section from the current project.
   *
   * @param projectId
   * @param section
   */
  removeSection(projectId: string, section: Section) {
    return this.db
        .collection('projects')
        .doc(projectId)
        .update({
          sections: firebase.firestore.FieldValue.arrayRemove(section)
        });
  }

  /**
   * Returns an observable list of all proiects which belong to the current user.
   * This is used to show on their profile page.
   */
  getUserProjects() {
    return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db
                .collection<Project>('projects', ref =>
                    ref.where('uid', '==', user.uid).orderBy('createdAt')
                )
                .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        })
    );
  }

  /**
   * Returns an observable list of all proiects which belong to the current user.
   * This is used to show on their profile page.
   *
   * @param projectId: string
   */
  getProjectSections(projectId: string) {
    return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db
                .collection<Section>('sections', ref =>
                    ref.where('projectId', '==', projectId).orderBy('position')
                )
                .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        })
    );
  }

  /**
   * Reorder the list of sections corresponding to this project.
   *
   * @param sections
   */
  sortSections(sections: Section[]) {
    const db    = firebase.firestore();
    const batch = db.batch();
    const refs  = sections.map(section => db.collection('sections').doc(section.id));
    refs.forEach((ref, index) => batch.update(ref, { position: index }));
    batch.commit();
  }
}
