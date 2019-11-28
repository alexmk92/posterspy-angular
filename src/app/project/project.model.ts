export interface Project {
    id?: string;
    title?: string;
    isDraft: boolean;
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
    position?: number;
    type?: 'text' | 'media' | 'video';
    text?: string;
    image?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    textColor?: string;
}
