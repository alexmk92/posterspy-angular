export interface Widget {
    id?: string;
    type?: 'text' | 'media' | 'video';
    columns?: number;
    content?: string;
}
