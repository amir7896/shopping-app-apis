import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_KEY } from "../config";
import User, { IUser } from "../models/userModel";
import { IUserInputDTO, IUserOutputDTO } from "../interfaces/userInterface";

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserInputDTO = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser: IUser = await newUser.save();
    const userOutput: IUserOutputDTO = { email: savedUser.email };

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userOutput,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserInputDTO = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) return res.status(401).send("Invalid email or password");
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).send("Invalid email or password");

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_KEY);
    res.header("Authorization", `Bearer ${token}`).json({ token });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
