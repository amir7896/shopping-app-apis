## Shopping app backend

This documentation provides details on how to use the API endpoints of the backend server.

## Installation

Before running the backend server and the unit tests, make sure to install the required dependencies. You can do this using the following command:

```bash
npm install
```

## For run server

1-nodemon src/server.ts
2-npm run dev

## For testing

npm test

## Table of Contents

1. [Create a Shopping list](#create-a-shooping)
2. [Share a shopping list ](#share-shopping-list)
3. [View shared shopping list ](#view-shared-shopping-list)

## 1. Create a shopping list

- **URL**: POST /api/shopping-list/create
- **Description**: Create a new shopping list.
- **Request Body**:
  - `listName` (string): The name of list.
- **Response**:
  - `success` (boolean): `true` if the shopping list was created successfully.
  - `message` (string): A success message.

## 2. Share a shopping list

- **URL**: POST /api/shopping-list/share
- **Description**: Share shopping list to user.
- **Request Body**:

  - `listId` (string): ID of list (shopping list).
  - `sharedWith` (string): Email of user to share shopping list list.
  - `permission` (string): Permission to user.

- **Response**:
  - `success` (boolean): `true` if the shopping list was shared successfully.
  - `message` (string): A success message.

## 3. Viewed Shared shopping list

- **URL**: POST /api/shopping-list/shared/:userId
- **Description**: Share shopping list to user.
- **Request Params**:

  - `userId` (string): ID of the user who shares the shopping list.

- **Response**:
  - `success` (boolean): `true` if the shopping list was shared successfully.
  - `message` (string): A success message.
  - `data` (Array):An array of shopping list th user share.
