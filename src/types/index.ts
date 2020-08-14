export interface IBot {
    id: number;
    name: string;
    description: string;
    date: string; // Date?
    image: any | null; // File?
}

export type StringValidator = (v: string) => string | boolean;
