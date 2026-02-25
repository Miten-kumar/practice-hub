export interface User {
    user_id:string;
    name:string;
    email:string;
    contact_no:string;
    created_at:Date;
}

export interface IUserRepository {
    findById(user_id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: Omit<User, "user_id" | "created_at">): Promise<User>;
    update(user_id: string, user: Partial<Omit<User, "user_id" | "created_at">>): Promise<User | null>;
    delete(user_id: string): Promise<void>;
}