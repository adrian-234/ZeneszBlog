export interface Post {
    id: number,
    title: string,
    text: string;
    author: number;
    comments: number[];
    date: string
}