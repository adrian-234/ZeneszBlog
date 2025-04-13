export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    groups: number[]; //group ids
    role: string | 'writer' | 'reader';
}