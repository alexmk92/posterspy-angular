import {Section} from './section.model';
import {Tag} from './tag.model';
import {Image} from './image.model';

export interface Project {
    id?: string;
    slug?: string;
    title?: string;
    coverImage?: Image;
    thumbnailImage?: Image;
    isDraft?: boolean;
    sections?: Section[];
    tags?: Tag[];
    visibleFrom?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectRow {
    index?: number;
    projects: ProjectCell[];
}

export interface ProjectCell {
    index?: number;
    project: Project;
    image: Image;
}
