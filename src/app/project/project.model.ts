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

export interface Tag {
    id?: string;
    name?: string;
    color?: 'red' | 'blue' | 'green' | 'orange' | 'yellow';
}

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

export interface Widget {
    id?: string;
    type?: 'text' | 'media' | 'video';
    columns?: number;
    content?: string;
}
