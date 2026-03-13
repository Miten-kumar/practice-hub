export type Role = "user" | "admin"

export interface AccountInfo {
    username:string
    password:string
    role: Role
}