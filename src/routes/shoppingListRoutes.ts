import express from "express";
import {
  shareShoppingList,
  viewSharedLists,
  createShoppingList,
} from "../controllers/shoppingListController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createShoppingList);
router.post("/share", authenticateToken, shareShoppingList);
router.get("/shared/:userId", authenticateToken, viewSharedLists);

export default router;
