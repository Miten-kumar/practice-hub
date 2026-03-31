export type Gender = "male" | "female" | "other";


export interface User {
    id:string;
    email:string;
    first_name:string;
    last_name:string;
    contact_number:string;
    age:number;
    gender:Gender;
    password:string;
    created_at:Date;
}