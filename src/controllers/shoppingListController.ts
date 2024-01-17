import { Request, Response } from "express";

import ShoppingList, { IShoppingList } from "../models/shoppingListModel";
import {
  IShareListInputDTO,
  ICreateShoppingListInputDTO,
} from "../interfaces/shoppingListInterface";

// Create shopping list
export const createShoppingList = async (req: Request, res: Response) => {
  try {
    const { listName }: ICreateShoppingListInputDTO = req.body;
    const userId = req.user?.userId;

    const newShoppingList: IShoppingList = new ShoppingList({
      listName,
      userId,
    });

    await newShoppingList.save();

    res.status(201).json({
      message: "Shopping list created successfully",
      listId: newShoppingList._id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Share shopping list
export const shareShoppingList = async (req: Request, res: Response) => {
  try {
    const { listId, sharedWith, permission }: IShareListInputDTO = req.body;
    const userId = req.user?.userId;

    if (!listId || !sharedWith || !permission) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    const shoppingList: IShoppingList | null = await ShoppingList.findOne({
      _id: listId,
      userId,
    });

    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }

    // Add the new sharing information
    shoppingList.sharedWith.push({ userId: sharedWith, permission });
    await shoppingList.save();

    res.status(200).json({ message: "Shopping list shared successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// View share shopping list
export const viewSharedLists = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).send("Missing userId parameter");
    }

    const sharedLists: IShoppingList[] = await ShoppingList.find({
      userId,
      sharedWith: { $exists: true, $not: { $size: 0 } },
    });

    const result: Array<{
      listName: string;
      sharedWith: Array<{ userEmail: string; permission: string }>;
    }> = sharedLists.map((list) => ({
      listName: list.listName,
      sharedWith: list.sharedWith.map((shared) => ({
        userEmail: shared.userId,
        permission: shared.permission,
      })),
    }));

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
