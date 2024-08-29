export interface UserType {
    id: number;
    email: string;
    name: string;
}

export interface LoginResponseType {
    user: UserType;
    token: string;
}

export interface LoginRequestType {
    email: string;
    password: string;
}

export interface PostType {
    id: number;
    title: string;
    content: string;
    published: boolean;
    autherId: number;
}
