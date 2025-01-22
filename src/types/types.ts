export interface Comment {
    id: number;
    name: string;
    body: string;
    replies: Comment[];
}

export interface Image {
    id: number;
    url: string;
    likes: number;
    comments: Comment[];
}
