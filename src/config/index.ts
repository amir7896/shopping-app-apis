import * as dotenv from "dotenv";

dotenv.config();
export const DB = process.env.DB!;
export const JWT_KEY = process.env.JWT_SECRET!;
