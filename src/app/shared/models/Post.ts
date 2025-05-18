export interface Post {
    id: string,
    title: string,
    text: string;
    author: string;
    comments: string[];
    comment_count: number;
    date: string
}