export interface IShareListInputDTO {
  listId: string;
  sharedWith: string;
  permission: string;
}

export interface IViewSharedListsInputDTO {
  userId: string;
}

export interface ICreateShoppingListInputDTO {
  listName: string;
}
