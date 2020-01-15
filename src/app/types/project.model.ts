import {Section} from './section.model';
import {Tag} from './tag.model';

export interface Project {
    id?: string;
    title?: string;
    isDraft?: boolean;
    sections?: Section[];
    tags?: Tag[];
    visibleFrom?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

