import express from "express";
import authRoutes from "./routes/authRoutes";
import shoppingListRoutes from "./routes/shoppingListRoutes";
import { connectToDatabase } from "./config/db.config";

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/shopping-list", shoppingListRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
