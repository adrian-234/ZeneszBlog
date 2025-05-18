export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    groups: string[];
    group_count: number;
    role: "reader" | "writer"; 
}