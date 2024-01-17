import mongoose, { Document } from "mongoose";

export interface IShoppingList extends Document {
  userId: string;
  listName: string;
  sharedWith: Array<{ userId: string; permission: string }>;
}

const shoppingListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  listName: { type: String, required: true },
  sharedWith: [{ userId: String, permission: String }],
});

export default mongoose.model<IShoppingList>(
  "ShoppingList",
  shoppingListSchema
);
