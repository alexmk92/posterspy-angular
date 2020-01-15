import { Widget } from './widget.model';

export interface Section {
    id?: string;
    widgets?: Widget[];
    position?: number;
    text?: string;
    image?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    textColor?: string;
    coverImage?: string;
}
