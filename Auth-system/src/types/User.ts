export interface IUser {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  password?: string;
  confirmPassword?: string;
}
