export interface User {
    id?:number;
    email:string;
    password:string;
    role?:string;
}

export interface Annonce {
    id?:number;
    title:string;
    description:string;
    price:number;
    user?:User;
}