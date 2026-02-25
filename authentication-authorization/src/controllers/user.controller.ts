import { Response, Request } from "express";
import { UserRepository } from "../services/user.service";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../utils/validationsSchema";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {

    if (!req.body) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const {
      email,
      first_name,
      last_name,
      contact_number,
      age,
      gender,
      password,
      confirm_password,
    } = req.body;


    const {
      success,
      error,
      data: user,
    } = registerSchema.safeParse({
      email,
      first_name,
      last_name,
      contact_number,
      age,
      gender,
      password,
      confirm_password,
    });


    if (!success) {
      return res.status(400).json({ error: error.issues[0].message });
    }

    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }


    const userRepository = new UserRepository();


    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingContact = await userRepository.findByContact(contact_number);
    if (existingContact) {
      return res.status(400).json({ error: "Contact number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await userRepository.create({
      ...user,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: { email: newuser.email , first_name: newuser.first_name, last_name: newuser.last_name } });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {

    if (!req.body) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { email, password } = req.body;
    const {
      success,
      error,
      data: userData,
    } = loginSchema.safeParse({ email, password });

    if (!success) {
      return res.status(400).json({ error: error.issues });
    }

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }


    const token = jwt.sign(
      { email: user.email, full_name: user.first_name + " " + user.last_name },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "15m" },
    );
    res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: `Failed to log in user: ${error}` });
  }
};
