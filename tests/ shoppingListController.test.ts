const request = require("supertest");
import mongoose from "mongoose";
import app from "../src/server";
import User from "../src/models/userModel";
import ShoppingList from "../src/models/shoppingListModel";
import { DB } from "../src/config/index";

beforeAll(async () => {
  await mongoose.connect(DB);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Shopping List Controller", () => {
  let authToken: string;
  let userId: string;
  let listId: string;

  beforeAll(async () => {
    const userResponse = await request(app)
      .post("/api/auth/register")
      .send({ email: "ali@gmail.com", password: "Test" });
    userId = userResponse.body.userId;

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "ali@gmail.com", password: "Test" });
    authToken = loginResponse.header["authorization"];
  });

  describe("POST /api/shopping-list/create", () => {
    it("should create a shopping list successfully", async () => {
      const createListResponse = await request(app)
        .post("/api/shopping-list/create")
        .set("Authorization", authToken)
        .send({ listName: "Test List" });

      listId = createListResponse.body.listId;

      expect(createListResponse.status).toBe(201);
      expect(createListResponse.body.message).toBe(
        "Shopping list created successfully"
      );
      expect(listId).toBeDefined();
    });
  });

  describe("POST /api/shopping-list/share", () => {
    it("should share a shopping list successfully", async () => {
      const shareResponse = await request(app)
        .post("/api/shopping-list/share")
        .set("Authorization", authToken)
        .send({
          listId,
          sharedWith: "shareduser@example.com",
          permission: "read",
        });

      expect(shareResponse.status).toBe(200);
      expect(shareResponse.body.message).toBe(
        "Shopping list shared successfully"
      );
    });

    it("should return 404 if the shopping list is not found", async () => {
      const shareResponse = await request(app)
        .post("/api/shopping-list/share")
        .set("Authorization", authToken)
        .send({
          listId: "65a78be8098589e212a03639",
          sharedWith: "shareduser@example.com",
          permission: "read",
        });

      expect(shareResponse.status).toBe(404);
      expect(shareResponse.text).toBe('{"error":"Shopping list not found"}');
    });
  });

  describe("GET /api/shopping-list/shared/:userId", () => {
    it("should retrieve shared shopping lists successfully", async () => {
      const viewSharedResponse = await request(app)
        .get(`/api/shopping-list/shared/${userId}`)
        .set("Authorization", authToken);
      expect(viewSharedResponse.status).toBe(200);
    });

    it("should return an empty array if the user has no shared lists", async () => {
      const viewSharedResponse = await request(app)
        .get(`/api/shopping-list/shared/nonexistentuser`)
        .set("Authorization", authToken);

      expect(viewSharedResponse.status).toBe(200);
      expect(viewSharedResponse.body).toHaveLength(0);
    });
  });
});
