import { DB } from ".";
import mongoose from "mongoose";

const database = DB;

export async function connectToDatabase() {
  await mongoose
    .connect(database)
    .then(() => {
      console.log("Connected To Mongo Atlsa Server");
    })
    .catch((error: Error) => {
      console.log("Erro In Connection ====", error);
    });
}
