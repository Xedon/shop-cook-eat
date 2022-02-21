/* eslint-disable*/
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A builtin object identifier type for a relation name */
  RegClass: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

export type Account = Node & {
  __typename?: "Account";
  accountOrigin: Origin;
  email: Scalars["String"];
  googleId?: Maybe<Scalars["BigInt"]>;
  id: Scalars["UUID"];
  name: Scalars["String"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
  profilePictureUrl?: Maybe<Scalars["String"]>;
};

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `accountOrigin` field. */
  accountOrigin?: InputMaybe<Origin>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars["String"]>;
  /** Checks for equality with the object’s `googleId` field. */
  googleId?: InputMaybe<Scalars["BigInt"]>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars["String"]>;
  /** Checks for equality with the object’s `profilePictureUrl` field. */
  profilePictureUrl?: InputMaybe<Scalars["String"]>;
};

/** A filter to be used against `Account` object types. All fields are combined with a logical ‘and.’ */
export type AccountFilter = {
  /** Filter by the object’s `accountOrigin` field. */
  accountOrigin?: InputMaybe<OriginFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `googleId` field. */
  googleId?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `profilePictureUrl` field. */
  profilePictureUrl?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Account` */
export type AccountInput = {
  accountOrigin: Origin;
  email: Scalars["String"];
  googleId?: InputMaybe<Scalars["BigInt"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name: Scalars["String"];
  profilePictureUrl?: InputMaybe<Scalars["String"]>;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  accountOrigin?: InputMaybe<Origin>;
  email?: InputMaybe<Scalars["String"]>;
  googleId?: InputMaybe<Scalars["BigInt"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name?: InputMaybe<Scalars["String"]>;
  profilePictureUrl?: InputMaybe<Scalars["String"]>;
};

/** A connection to a list of `Account` values. */
export type AccountsConnection = {
  __typename?: "AccountsConnection";
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountsEdge>;
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `Account` edge in the connection. */
export type AccountsEdge = {
  __typename?: "AccountsEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** Methods to use when ordering `Account`. */
export enum AccountsOrderBy {
  AccountOriginAsc = "ACCOUNT_ORIGIN_ASC",
  AccountOriginDesc = "ACCOUNT_ORIGIN_DESC",
  EmailAsc = "EMAIL_ASC",
  EmailDesc = "EMAIL_DESC",
  GoogleIdAsc = "GOOGLE_ID_ASC",
  GoogleIdDesc = "GOOGLE_ID_DESC",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
  ProfilePictureUrlAsc = "PROFILE_PICTURE_URL_ASC",
  ProfilePictureUrlDesc = "PROFILE_PICTURE_URL_DESC",
}

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars["BigInt"]>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars["BigInt"]>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars["BigInt"]>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars["BigInt"]>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars["BigInt"]>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars["Boolean"]>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars["BigInt"]>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars["BigInt"]>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars["BigInt"]>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars["BigInt"]>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars["BigInt"]>>;
};

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: "CreateAccountPayload";
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
};

/** All input for the create `ItemCategory` mutation. */
export type CreateItemCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The `ItemCategory` to be created by this mutation. */
  itemCategory: ItemCategoryInput;
};

/** The output of our create `ItemCategory` mutation. */
export type CreateItemCategoryPayload = {
  __typename?: "CreateItemCategoryPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `ItemCategory` that was created by this mutation. */
  itemCategory?: Maybe<ItemCategory>;
  /** An edge for our `ItemCategory`. May be used by Relay 1. */
  itemCategoryEdge?: Maybe<ItemCategoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our create `ItemCategory` mutation. */
export type CreateItemCategoryPayloadItemCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemCategoriesOrderBy>>;
};

/** All input for the create `Item` mutation. */
export type CreateItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The `Item` to be created by this mutation. */
  item: ItemInput;
};

/** The output of our create `Item` mutation. */
export type CreateItemPayload = {
  __typename?: "CreateItemPayload";
  /** Reads a single `ItemCategory` that is related to this `Item`. */
  category?: Maybe<ItemCategory>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Item` that was created by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our create `Item` mutation. */
export type CreateItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the create `ItemShoppingList` mutation. */
export type CreateItemShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The `ItemShoppingList` to be created by this mutation. */
  itemShoppingList: ItemShoppingListInput;
};

/** The output of our create `ItemShoppingList` mutation. */
export type CreateItemShoppingListPayload = {
  __typename?: "CreateItemShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Reads a single `Item` that is related to this `ItemShoppingList`. */
  item?: Maybe<Item>;
  /** The `ItemShoppingList` that was created by this mutation. */
  itemShoppingList?: Maybe<ItemShoppingList>;
  /** An edge for our `ItemShoppingList`. May be used by Relay 1. */
  itemShoppingListEdge?: Maybe<ItemShoppingListsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `ShoppingList` that is related to this `ItemShoppingList`. */
  shoppingList?: Maybe<ShoppingList>;
};

/** The output of our create `ItemShoppingList` mutation. */
export type CreateItemShoppingListPayloadItemShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

/** All input for the create `ShoppingList` mutation. */
export type CreateShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The `ShoppingList` to be created by this mutation. */
  shoppingList: ShoppingListInput;
};

/** The output of our create `ShoppingList` mutation. */
export type CreateShoppingListPayload = {
  __typename?: "CreateShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ShoppingList` that was created by this mutation. */
  shoppingList?: Maybe<ShoppingList>;
  /** An edge for our `ShoppingList`. May be used by Relay 1. */
  shoppingListEdge?: Maybe<ShoppingListsEdge>;
};

/** The output of our create `ShoppingList` mutation. */
export type CreateShoppingListPayloadShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
};

/** All input for the create `UsedToken` mutation. */
export type CreateUsedTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The `UsedToken` to be created by this mutation. */
  usedToken: UsedTokenInput;
};

/** The output of our create `UsedToken` mutation. */
export type CreateUsedTokenPayload = {
  __typename?: "CreateUsedTokenPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UsedToken` that was created by this mutation. */
  usedToken?: Maybe<UsedToken>;
  /** An edge for our `UsedToken`. May be used by Relay 1. */
  usedTokenEdge?: Maybe<UsedTokensEdge>;
};

/** The output of our create `UsedToken` mutation. */
export type CreateUsedTokenPayloadUsedTokenEdgeArgs = {
  orderBy?: InputMaybe<Array<UsedTokensOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars["Datetime"]>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars["Datetime"]>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars["Datetime"]>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars["Datetime"]>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars["Datetime"]>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars["Boolean"]>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars["Datetime"]>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars["Datetime"]>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars["Datetime"]>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars["Datetime"]>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars["Datetime"]>>;
};

/** All input for the `deleteAccountByGoogleId` mutation. */
export type DeleteAccountByGoogleIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  googleId: Scalars["BigInt"];
};

/** All input for the `deleteAccountByNodeId` mutation. */
export type DeleteAccountByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: "DeleteAccountPayload";
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedAccountNodeId?: Maybe<Scalars["ID"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
};

/** All input for the `deleteItemByName` mutation. */
export type DeleteItemByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

/** All input for the `deleteItemByNodeId` mutation. */
export type DeleteItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Item` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteItemCategoryByNodeId` mutation. */
export type DeleteItemCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ItemCategory` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteItemCategory` mutation. */
export type DeleteItemCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
};

/** The output of our delete `ItemCategory` mutation. */
export type DeleteItemCategoryPayload = {
  __typename?: "DeleteItemCategoryPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedItemCategoryNodeId?: Maybe<Scalars["ID"]>;
  /** The `ItemCategory` that was deleted by this mutation. */
  itemCategory?: Maybe<ItemCategory>;
  /** An edge for our `ItemCategory`. May be used by Relay 1. */
  itemCategoryEdge?: Maybe<ItemCategoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our delete `ItemCategory` mutation. */
export type DeleteItemCategoryPayloadItemCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemCategoriesOrderBy>>;
};

/** All input for the `deleteItem` mutation. */
export type DeleteItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
};

/** The output of our delete `Item` mutation. */
export type DeleteItemPayload = {
  __typename?: "DeleteItemPayload";
  /** Reads a single `ItemCategory` that is related to this `Item`. */
  category?: Maybe<ItemCategory>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedItemNodeId?: Maybe<Scalars["ID"]>;
  /** The `Item` that was deleted by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our delete `Item` mutation. */
export type DeleteItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the `deleteItemShoppingListByNodeId` mutation. */
export type DeleteItemShoppingListByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ItemShoppingList` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteItemShoppingList` mutation. */
export type DeleteItemShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The output of our delete `ItemShoppingList` mutation. */
export type DeleteItemShoppingListPayload = {
  __typename?: "DeleteItemShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedItemShoppingListNodeId?: Maybe<Scalars["ID"]>;
  /** Reads a single `Item` that is related to this `ItemShoppingList`. */
  item?: Maybe<Item>;
  /** The `ItemShoppingList` that was deleted by this mutation. */
  itemShoppingList?: Maybe<ItemShoppingList>;
  /** An edge for our `ItemShoppingList`. May be used by Relay 1. */
  itemShoppingListEdge?: Maybe<ItemShoppingListsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `ShoppingList` that is related to this `ItemShoppingList`. */
  shoppingList?: Maybe<ShoppingList>;
};

/** The output of our delete `ItemShoppingList` mutation. */
export type DeleteItemShoppingListPayloadItemShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

/** All input for the `deleteShoppingListByName` mutation. */
export type DeleteShoppingListByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

/** All input for the `deleteShoppingListByNodeId` mutation. */
export type DeleteShoppingListByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ShoppingList` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteShoppingList` mutation. */
export type DeleteShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
};

/** The output of our delete `ShoppingList` mutation. */
export type DeleteShoppingListPayload = {
  __typename?: "DeleteShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedShoppingListNodeId?: Maybe<Scalars["ID"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ShoppingList` that was deleted by this mutation. */
  shoppingList?: Maybe<ShoppingList>;
  /** An edge for our `ShoppingList`. May be used by Relay 1. */
  shoppingListEdge?: Maybe<ShoppingListsEdge>;
};

/** The output of our delete `ShoppingList` mutation. */
export type DeleteShoppingListPayloadShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
};

/** All input for the `deleteUsedTokenByNodeId` mutation. */
export type DeleteUsedTokenByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `UsedToken` to be deleted. */
  nodeId: Scalars["ID"];
};

/** All input for the `deleteUsedToken` mutation. */
export type DeleteUsedTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  tokenHash: Scalars["String"];
  tokenType: Origin;
};

/** The output of our delete `UsedToken` mutation. */
export type DeleteUsedTokenPayload = {
  __typename?: "DeleteUsedTokenPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  deletedUsedTokenNodeId?: Maybe<Scalars["ID"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UsedToken` that was deleted by this mutation. */
  usedToken?: Maybe<UsedToken>;
  /** An edge for our `UsedToken`. May be used by Relay 1. */
  usedTokenEdge?: Maybe<UsedTokensEdge>;
};

/** The output of our delete `UsedToken` mutation. */
export type DeleteUsedTokenPayloadUsedTokenEdgeArgs = {
  orderBy?: InputMaybe<Array<UsedTokensOrderBy>>;
};

/** All input for the `dieselManageUpdatedAt` mutation. */
export type DieselManageUpdatedAtInput = {
  _tbl?: InputMaybe<Scalars["RegClass"]>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

/** The output of our `dieselManageUpdatedAt` mutation. */
export type DieselManageUpdatedAtPayload = {
  __typename?: "DieselManageUpdatedAtPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type GoogleLoginInput = {
  idToken: Scalars["String"];
};

export type Item = Node & {
  __typename?: "Item";
  /** Reads a single `ItemCategory` that is related to this `Item`. */
  category?: Maybe<ItemCategory>;
  categoryId?: Maybe<Scalars["UUID"]>;
  id: Scalars["UUID"];
  /** Reads and enables pagination through a set of `ItemShoppingListHistory`. */
  itemShoppingListHistories: ItemShoppingListHistoriesConnection;
  /** Reads and enables pagination through a set of `ItemShoppingList`. */
  itemShoppingLists: ItemShoppingListsConnection;
  name: Scalars["String"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
  /** Reads and enables pagination through a set of `ShoppingList`. */
  shoppingListsByItemShoppingListHistoryItemIdAndShoppingListId: ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyConnection;
  /** Reads and enables pagination through a set of `ShoppingList`. */
  shoppingListsByItemShoppingListItemIdAndShoppingListId: ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyConnection;
};

export type ItemItemShoppingListHistoriesArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListHistoryCondition>;
  filter?: InputMaybe<ItemShoppingListHistoryFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListHistoriesOrderBy>>;
};

export type ItemItemShoppingListsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListCondition>;
  filter?: InputMaybe<ItemShoppingListFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

export type ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdArgs =
  {
    after?: InputMaybe<Scalars["Cursor"]>;
    before?: InputMaybe<Scalars["Cursor"]>;
    condition?: InputMaybe<ShoppingListCondition>;
    filter?: InputMaybe<ShoppingListFilter>;
    first?: InputMaybe<Scalars["Int"]>;
    last?: InputMaybe<Scalars["Int"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
  };

export type ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ShoppingListCondition>;
  filter?: InputMaybe<ShoppingListFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
};

/** A connection to a list of `ItemCategory` values. */
export type ItemCategoriesConnection = {
  __typename?: "ItemCategoriesConnection";
  /** A list of edges which contains the `ItemCategory` and cursor to aid in pagination. */
  edges: Array<ItemCategoriesEdge>;
  /** A list of `ItemCategory` objects. */
  nodes: Array<Maybe<ItemCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItemCategory` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `ItemCategory` edge in the connection. */
export type ItemCategoriesEdge = {
  __typename?: "ItemCategoriesEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `ItemCategory` at the end of the edge. */
  node?: Maybe<ItemCategory>;
};

/** Methods to use when ordering `ItemCategory`. */
export enum ItemCategoriesOrderBy {
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
}

export type ItemCategory = Node & {
  __typename?: "ItemCategory";
  id: Scalars["UUID"];
  /** Reads and enables pagination through a set of `Item`. */
  itemsByCategoryId: ItemsConnection;
  name: Scalars["String"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
};

export type ItemCategoryItemsByCategoryIdArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemCondition>;
  filter?: InputMaybe<ItemFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/**
 * A condition to be used against `ItemCategory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ItemCategoryCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars["String"]>;
};

/** A filter to be used against `ItemCategory` object types. All fields are combined with a logical ‘and.’ */
export type ItemCategoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemCategoryFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ItemCategoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemCategoryFilter>>;
};

/** Input for the nested mutation of `itemCategory` in the `ItemInput` mutation. */
export type ItemCategoryIdFkeyInput = {
  /** The primary key(s) for `itemCategory` for the far side of the relationship. */
  connectById?: InputMaybe<ItemCategoryItemCategoryPkeyConnect>;
  /** The primary key(s) for `itemCategory` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<ItemCategoryNodeIdConnect>;
  /** A `ItemCategoryInput` object that will be created and connected to this object. */
  create?: InputMaybe<ItemCategoryIdFkeyItemCategoryCreateInput>;
  /** The primary key(s) for `itemCategory` for the far side of the relationship. */
  deleteById?: InputMaybe<ItemCategoryItemCategoryPkeyDelete>;
  /** The primary key(s) for `itemCategory` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<ItemCategoryNodeIdDelete>;
  /** The primary key(s) and patch data for `itemCategory` for the far side of the relationship. */
  updateById?: InputMaybe<ItemCategoryOnItemForItemCategoryIdFkeyUsingItemCategoryPkeyUpdate>;
  /** The primary key(s) and patch data for `itemCategory` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<ItemOnItemForItemCategoryIdFkeyNodeIdUpdate>;
};

/** Input for the nested mutation of `item` in the `ItemCategoryInput` mutation. */
export type ItemCategoryIdFkeyInverseInput = {
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectById?: InputMaybe<Array<ItemItemPkeyConnect>>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByName?: InputMaybe<Array<ItemItemItemNameKeyConnect>>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<Array<ItemNodeIdConnect>>;
  /** A `ItemInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<ItemCategoryIdFkeyItemCreateInput>>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<ItemItemPkeyDelete>>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByName?: InputMaybe<Array<ItemItemItemNameKeyDelete>>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<Array<ItemNodeIdDelete>>;
  /** Flag indicating whether all other `item` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars["Boolean"]>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateById?: InputMaybe<
    Array<ItemOnItemForItemCategoryIdFkeyUsingItemPkeyUpdate>
  >;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByName?: InputMaybe<
    Array<ItemOnItemForItemCategoryIdFkeyUsingItemItemNameKeyUpdate>
  >;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<
    Array<ItemCategoryOnItemForItemCategoryIdFkeyNodeIdUpdate>
  >;
};

/** The `itemCategory` to be created by this mutation. */
export type ItemCategoryIdFkeyItemCategoryCreateInput = {
  itemsUsingId?: InputMaybe<ItemCategoryIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** The `item` to be created by this mutation. */
export type ItemCategoryIdFkeyItemCreateInput = {
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** An input for mutations affecting `ItemCategory` */
export type ItemCategoryInput = {
  itemsUsingId?: InputMaybe<ItemCategoryIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** The fields on `itemCategory` to look up the row to connect. */
export type ItemCategoryItemCategoryPkeyConnect = {
  id: Scalars["UUID"];
};

/** The fields on `itemCategory` to look up the row to delete. */
export type ItemCategoryItemCategoryPkeyDelete = {
  id: Scalars["UUID"];
};

/** The globally unique `ID` look up for the row to connect. */
export type ItemCategoryNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `itemCategory` to be connected. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to delete. */
export type ItemCategoryNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `itemCategory` to be deleted. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to update. */
export type ItemCategoryOnItemForItemCategoryIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `item` to be connected. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `item` being updated. */
  patch: ItemPatch;
};

/** The fields on `itemCategory` to look up the row to update. */
export type ItemCategoryOnItemForItemCategoryIdFkeyUsingItemCategoryPkeyUpdate =
  {
    id: Scalars["UUID"];
    /** An object where the defined keys will be set on the `itemCategory` being updated. */
    patch: UpdateItemCategoryOnItemForItemCategoryIdFkeyPatch;
  };

/** Represents an update to a `ItemCategory`. Fields that are set will be updated. */
export type ItemCategoryPatch = {
  itemsUsingId?: InputMaybe<ItemCategoryIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

/** A condition to be used against `Item` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ItemCondition = {
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars["String"]>;
};

/** A filter to be used against `Item` object types. All fields are combined with a logical ‘and.’ */
export type ItemFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemFilter>>;
  /** Filter by the object’s `categoryId` field. */
  categoryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ItemFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemFilter>>;
};

/** An input for mutations affecting `Item` */
export type ItemInput = {
  categoryId?: InputMaybe<Scalars["UUID"]>;
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** The fields on `item` to look up the row to connect. */
export type ItemItemItemNameKeyConnect = {
  name: Scalars["String"];
};

/** The fields on `item` to look up the row to delete. */
export type ItemItemItemNameKeyDelete = {
  name: Scalars["String"];
};

/** The fields on `item` to look up the row to connect. */
export type ItemItemPkeyConnect = {
  id: Scalars["UUID"];
};

/** The fields on `item` to look up the row to delete. */
export type ItemItemPkeyDelete = {
  id: Scalars["UUID"];
};

/** The globally unique `ID` look up for the row to connect. */
export type ItemNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `item` to be connected. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to delete. */
export type ItemNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `item` to be deleted. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to update. */
export type ItemOnItemForItemCategoryIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `itemCategory` to be connected. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `itemCategory` being updated. */
  patch: ItemCategoryPatch;
};

/** The fields on `item` to look up the row to update. */
export type ItemOnItemForItemCategoryIdFkeyUsingItemItemNameKeyUpdate = {
  name: Scalars["String"];
  /** An object where the defined keys will be set on the `item` being updated. */
  patch: UpdateItemOnItemForItemCategoryIdFkeyPatch;
};

/** The fields on `item` to look up the row to update. */
export type ItemOnItemForItemCategoryIdFkeyUsingItemPkeyUpdate = {
  id: Scalars["UUID"];
  /** An object where the defined keys will be set on the `item` being updated. */
  patch: UpdateItemOnItemForItemCategoryIdFkeyPatch;
};

/** The globally unique `ID` look up for the row to update. */
export type ItemOnItemShoppingListForItemShoppingListItemIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `itemShoppingList` to be connected. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `itemShoppingList` being updated. */
  patch: ItemShoppingListPatch;
};

/** The fields on `item` to look up the row to update. */
export type ItemOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemItemNameKeyUpdate =
  {
    name: Scalars["String"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: UpdateItemOnItemShoppingListForItemShoppingListItemIdFkeyPatch;
  };

/** The fields on `item` to look up the row to update. */
export type ItemOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemPkeyUpdate =
  {
    id: Scalars["UUID"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: UpdateItemOnItemShoppingListForItemShoppingListItemIdFkeyPatch;
  };

/** The globally unique `ID` look up for the row to update. */
export type ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `itemShoppingListHistory` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
    patch: ItemShoppingListHistoryPatch;
  };

/** The fields on `item` to look up the row to update. */
export type ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemItemNameKeyUpdate =
  {
    name: Scalars["String"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: UpdateItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyPatch;
  };

/** The fields on `item` to look up the row to update. */
export type ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemPkeyUpdate =
  {
    id: Scalars["UUID"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: UpdateItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyPatch;
  };

/** Represents an update to a `Item`. Fields that are set will be updated. */
export type ItemPatch = {
  categoryId?: InputMaybe<Scalars["UUID"]>;
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ItemShoppingList = Node & {
  __typename?: "ItemShoppingList";
  additionalInformations?: Maybe<Scalars["String"]>;
  /** Reads a single `Item` that is related to this `ItemShoppingList`. */
  item?: Maybe<Item>;
  itemId: Scalars["UUID"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
  /** Reads a single `ShoppingList` that is related to this `ItemShoppingList`. */
  shoppingList?: Maybe<ShoppingList>;
  shoppingListId: Scalars["UUID"];
};

/**
 * A condition to be used against `ItemShoppingList` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ItemShoppingListCondition = {
  /** Checks for equality with the object’s `additionalInformations` field. */
  additionalInformations?: InputMaybe<Scalars["String"]>;
  /** Checks for equality with the object’s `itemId` field. */
  itemId?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `shoppingListId` field. */
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
};

/** A filter to be used against `ItemShoppingList` object types. All fields are combined with a logical ‘and.’ */
export type ItemShoppingListFilter = {
  /** Filter by the object’s `additionalInformations` field. */
  additionalInformations?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemShoppingListFilter>>;
  /** Filter by the object’s `itemId` field. */
  itemId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ItemShoppingListFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemShoppingListFilter>>;
  /** Filter by the object’s `shoppingListId` field. */
  shoppingListId?: InputMaybe<UuidFilter>;
};

/** A connection to a list of `ItemShoppingListHistory` values. */
export type ItemShoppingListHistoriesConnection = {
  __typename?: "ItemShoppingListHistoriesConnection";
  /** A list of edges which contains the `ItemShoppingListHistory` and cursor to aid in pagination. */
  edges: Array<ItemShoppingListHistoriesEdge>;
  /** A list of `ItemShoppingListHistory` objects. */
  nodes: Array<Maybe<ItemShoppingListHistory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItemShoppingListHistory` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `ItemShoppingListHistory` edge in the connection. */
export type ItemShoppingListHistoriesEdge = {
  __typename?: "ItemShoppingListHistoriesEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `ItemShoppingListHistory` at the end of the edge. */
  node?: Maybe<ItemShoppingListHistory>;
};

/** Methods to use when ordering `ItemShoppingListHistory`. */
export enum ItemShoppingListHistoriesOrderBy {
  AdditionalInformationsAsc = "ADDITIONAL_INFORMATIONS_ASC",
  AdditionalInformationsDesc = "ADDITIONAL_INFORMATIONS_DESC",
  IdAsc = "ID_ASC",
  IdDesc = "ID_DESC",
  ItemIdAsc = "ITEM_ID_ASC",
  ItemIdDesc = "ITEM_ID_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
  ShoppingListIdAsc = "SHOPPING_LIST_ID_ASC",
  ShoppingListIdDesc = "SHOPPING_LIST_ID_DESC",
}

export type ItemShoppingListHistory = Node & {
  __typename?: "ItemShoppingListHistory";
  additionalInformations?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  /** Reads a single `Item` that is related to this `ItemShoppingListHistory`. */
  item?: Maybe<Item>;
  itemId: Scalars["UUID"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
  /** Reads a single `ShoppingList` that is related to this `ItemShoppingListHistory`. */
  shoppingList?: Maybe<ShoppingList>;
  shoppingListId: Scalars["UUID"];
};

/**
 * A condition to be used against `ItemShoppingListHistory` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ItemShoppingListHistoryCondition = {
  /** Checks for equality with the object’s `additionalInformations` field. */
  additionalInformations?: InputMaybe<Scalars["String"]>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `itemId` field. */
  itemId?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `shoppingListId` field. */
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
};

/** A filter to be used against `ItemShoppingListHistory` object types. All fields are combined with a logical ‘and.’ */
export type ItemShoppingListHistoryFilter = {
  /** Filter by the object’s `additionalInformations` field. */
  additionalInformations?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ItemShoppingListHistoryFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `itemId` field. */
  itemId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ItemShoppingListHistoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ItemShoppingListHistoryFilter>>;
  /** Filter by the object’s `shoppingListId` field. */
  shoppingListId?: InputMaybe<UuidFilter>;
};

/** Input for the nested mutation of `item` in the `ItemShoppingListHistoryInput` mutation. */
export type ItemShoppingListHistoryItemIdFkeyInput = {
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectById?: InputMaybe<ItemItemPkeyConnect>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByName?: InputMaybe<ItemItemItemNameKeyConnect>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<ItemNodeIdConnect>;
  /** A `ItemInput` object that will be created and connected to this object. */
  create?: InputMaybe<ItemShoppingListHistoryItemIdFkeyItemCreateInput>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteById?: InputMaybe<ItemItemPkeyDelete>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByName?: InputMaybe<ItemItemItemNameKeyDelete>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<ItemNodeIdDelete>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateById?: InputMaybe<ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemPkeyUpdate>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByName?: InputMaybe<ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemItemNameKeyUpdate>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyNodeIdUpdate>;
};

/** Input for the nested mutation of `itemShoppingListHistory` in the `ItemInput` mutation. */
export type ItemShoppingListHistoryItemIdFkeyInverseInput = {
  /** The primary key(s) for `itemShoppingListHistory` for the far side of the relationship. */
  connectByIdAndItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListHistoryItemShoppingListHistoryPkeyConnect>
  >;
  /** The primary key(s) for `itemShoppingListHistory` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<Array<ItemShoppingListHistoryNodeIdConnect>>;
  /** The primary key(s) and patch data for `itemShoppingListHistory` for the far side of the relationship. */
  updateByIdAndItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemShoppingListHistoryPkeyUpdate>
  >;
  /** The primary key(s) and patch data for `itemShoppingListHistory` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<
    Array<ItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyNodeIdUpdate>
  >;
};

/** The `item` to be created by this mutation. */
export type ItemShoppingListHistoryItemIdFkeyItemCreateInput = {
  categoryId?: InputMaybe<Scalars["UUID"]>;
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** The fields on `itemShoppingListHistory` to look up the row to connect. */
export type ItemShoppingListHistoryItemShoppingListHistoryPkeyConnect = {
  id: Scalars["UUID"];
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The globally unique `ID` look up for the row to connect. */
export type ItemShoppingListHistoryNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `itemShoppingListHistory` to be connected. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to update. */
export type ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `item` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: ItemPatch;
  };

/** The fields on `itemShoppingListHistory` to look up the row to update. */
export type ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyUsingItemShoppingListHistoryPkeyUpdate =
  {
    id: Scalars["UUID"];
    itemId: Scalars["UUID"];
    /** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
    patch: UpdateItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyPatch;
    shoppingListId: Scalars["UUID"];
  };

/** The globally unique `ID` look up for the row to update. */
export type ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `shoppingList` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: ShoppingListPatch;
  };

/** The fields on `itemShoppingListHistory` to look up the row to update. */
export type ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingItemShoppingListHistoryPkeyUpdate =
  {
    id: Scalars["UUID"];
    itemId: Scalars["UUID"];
    /** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
    patch: UpdateItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyPatch;
    shoppingListId: Scalars["UUID"];
  };

/** Represents an update to a `ItemShoppingListHistory`. Fields that are set will be updated. */
export type ItemShoppingListHistoryPatch = {
  additionalInformations?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  itemId?: InputMaybe<Scalars["UUID"]>;
  itemToItemId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInput>;
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
  shoppingListToShoppingListId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInput>;
};

/** Input for the nested mutation of `shoppingList` in the `ItemShoppingListHistoryInput` mutation. */
export type ItemShoppingListHistoryShoppingListIdFkeyInput = {
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectById?: InputMaybe<ShoppingListShoppingListPkeyConnect>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectByName?: InputMaybe<ShoppingListShoppingListShoppingListNameKeyConnect>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<ShoppingListNodeIdConnect>;
  /** A `ShoppingListInput` object that will be created and connected to this object. */
  create?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyShoppingListCreateInput>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteById?: InputMaybe<ShoppingListShoppingListPkeyDelete>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteByName?: InputMaybe<ShoppingListShoppingListShoppingListNameKeyDelete>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<ShoppingListNodeIdDelete>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateById?: InputMaybe<ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingShoppingListPkeyUpdate>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateByName?: InputMaybe<ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingShoppingListShoppingListNameKeyUpdate>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyNodeIdUpdate>;
};

/** Input for the nested mutation of `itemShoppingListHistory` in the `ShoppingListInput` mutation. */
export type ItemShoppingListHistoryShoppingListIdFkeyInverseInput = {
  /** The primary key(s) for `itemShoppingListHistory` for the far side of the relationship. */
  connectByIdAndItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListHistoryItemShoppingListHistoryPkeyConnect>
  >;
  /** The primary key(s) for `itemShoppingListHistory` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<Array<ItemShoppingListHistoryNodeIdConnect>>;
  /** The primary key(s) and patch data for `itemShoppingListHistory` for the far side of the relationship. */
  updateByIdAndItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingItemShoppingListHistoryPkeyUpdate>
  >;
  /** The primary key(s) and patch data for `itemShoppingListHistory` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<
    Array<ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyNodeIdUpdate>
  >;
};

/** The `shoppingList` to be created by this mutation. */
export type ItemShoppingListHistoryShoppingListIdFkeyShoppingListCreateInput = {
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** An input for mutations affecting `ItemShoppingList` */
export type ItemShoppingListInput = {
  additionalInformations?: InputMaybe<Scalars["String"]>;
  itemId?: InputMaybe<Scalars["UUID"]>;
  itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
  shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
};

/** Input for the nested mutation of `item` in the `ItemShoppingListInput` mutation. */
export type ItemShoppingListItemIdFkeyInput = {
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectById?: InputMaybe<ItemItemPkeyConnect>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByName?: InputMaybe<ItemItemItemNameKeyConnect>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<ItemNodeIdConnect>;
  /** A `ItemInput` object that will be created and connected to this object. */
  create?: InputMaybe<ItemShoppingListItemIdFkeyItemCreateInput>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteById?: InputMaybe<ItemItemPkeyDelete>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByName?: InputMaybe<ItemItemItemNameKeyDelete>;
  /** The primary key(s) for `item` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<ItemNodeIdDelete>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateById?: InputMaybe<ItemOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemPkeyUpdate>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByName?: InputMaybe<ItemOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemItemNameKeyUpdate>;
  /** The primary key(s) and patch data for `item` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<ItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyNodeIdUpdate>;
};

/** Input for the nested mutation of `itemShoppingList` in the `ItemInput` mutation. */
export type ItemShoppingListItemIdFkeyInverseInput = {
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  connectByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListItemShoppingListPkeyConnect>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<Array<ItemShoppingListNodeIdConnect>>;
  /** A `ItemShoppingListInput` object that will be created and connected to this object. */
  create?: InputMaybe<
    Array<ItemShoppingListItemIdFkeyItemShoppingListCreateInput>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  deleteByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListItemShoppingListPkeyDelete>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<Array<ItemShoppingListNodeIdDelete>>;
  /** Flag indicating whether all other `itemShoppingList` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars["Boolean"]>;
  /** The primary key(s) and patch data for `itemShoppingList` for the far side of the relationship. */
  updateByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemShoppingListPkeyUpdate>
  >;
  /** The primary key(s) and patch data for `itemShoppingList` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<
    Array<ItemOnItemShoppingListForItemShoppingListItemIdFkeyNodeIdUpdate>
  >;
};

/** The `item` to be created by this mutation. */
export type ItemShoppingListItemIdFkeyItemCreateInput = {
  categoryId?: InputMaybe<Scalars["UUID"]>;
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** The `itemShoppingList` to be created by this mutation. */
export type ItemShoppingListItemIdFkeyItemShoppingListCreateInput = {
  additionalInformations?: InputMaybe<Scalars["String"]>;
  itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
  shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
};

/** The fields on `itemShoppingList` to look up the row to connect. */
export type ItemShoppingListItemShoppingListPkeyConnect = {
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The fields on `itemShoppingList` to look up the row to delete. */
export type ItemShoppingListItemShoppingListPkeyDelete = {
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The globally unique `ID` look up for the row to connect. */
export type ItemShoppingListNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `itemShoppingList` to be connected. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to delete. */
export type ItemShoppingListNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `itemShoppingList` to be deleted. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to update. */
export type ItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `item` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `item` being updated. */
    patch: ItemPatch;
  };

/** The fields on `itemShoppingList` to look up the row to update. */
export type ItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyUsingItemShoppingListPkeyUpdate =
  {
    itemId: Scalars["UUID"];
    /** An object where the defined keys will be set on the `itemShoppingList` being updated. */
    patch: UpdateItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyPatch;
    shoppingListId: Scalars["UUID"];
  };

/** The globally unique `ID` look up for the row to update. */
export type ItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `shoppingList` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: ShoppingListPatch;
  };

/** The fields on `itemShoppingList` to look up the row to update. */
export type ItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingItemShoppingListPkeyUpdate =
  {
    itemId: Scalars["UUID"];
    /** An object where the defined keys will be set on the `itemShoppingList` being updated. */
    patch: UpdateItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyPatch;
    shoppingListId: Scalars["UUID"];
  };

/** Represents an update to a `ItemShoppingList`. Fields that are set will be updated. */
export type ItemShoppingListPatch = {
  additionalInformations?: InputMaybe<Scalars["String"]>;
  itemId?: InputMaybe<Scalars["UUID"]>;
  itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
  shoppingListId?: InputMaybe<Scalars["UUID"]>;
  shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
};

/** Input for the nested mutation of `shoppingList` in the `ItemShoppingListInput` mutation. */
export type ItemShoppingListShoppingListIdFkeyInput = {
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectById?: InputMaybe<ShoppingListShoppingListPkeyConnect>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectByName?: InputMaybe<ShoppingListShoppingListShoppingListNameKeyConnect>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<ShoppingListNodeIdConnect>;
  /** A `ShoppingListInput` object that will be created and connected to this object. */
  create?: InputMaybe<ItemShoppingListShoppingListIdFkeyShoppingListCreateInput>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteById?: InputMaybe<ShoppingListShoppingListPkeyDelete>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteByName?: InputMaybe<ShoppingListShoppingListShoppingListNameKeyDelete>;
  /** The primary key(s) for `shoppingList` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<ShoppingListNodeIdDelete>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateById?: InputMaybe<ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingShoppingListPkeyUpdate>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateByName?: InputMaybe<ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingShoppingListShoppingListNameKeyUpdate>;
  /** The primary key(s) and patch data for `shoppingList` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<ItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyNodeIdUpdate>;
};

/** Input for the nested mutation of `itemShoppingList` in the `ShoppingListInput` mutation. */
export type ItemShoppingListShoppingListIdFkeyInverseInput = {
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  connectByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListItemShoppingListPkeyConnect>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  connectByNodeId?: InputMaybe<Array<ItemShoppingListNodeIdConnect>>;
  /** A `ItemShoppingListInput` object that will be created and connected to this object. */
  create?: InputMaybe<
    Array<ItemShoppingListShoppingListIdFkeyItemShoppingListCreateInput>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  deleteByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListItemShoppingListPkeyDelete>
  >;
  /** The primary key(s) for `itemShoppingList` for the far side of the relationship. */
  deleteByNodeId?: InputMaybe<Array<ItemShoppingListNodeIdDelete>>;
  /** Flag indicating whether all other `itemShoppingList` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars["Boolean"]>;
  /** The primary key(s) and patch data for `itemShoppingList` for the far side of the relationship. */
  updateByItemIdAndShoppingListId?: InputMaybe<
    Array<ItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingItemShoppingListPkeyUpdate>
  >;
  /** The primary key(s) and patch data for `itemShoppingList` for the far side of the relationship. */
  updateByNodeId?: InputMaybe<
    Array<ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyNodeIdUpdate>
  >;
};

/** The `itemShoppingList` to be created by this mutation. */
export type ItemShoppingListShoppingListIdFkeyItemShoppingListCreateInput = {
  additionalInformations?: InputMaybe<Scalars["String"]>;
  itemId?: InputMaybe<Scalars["UUID"]>;
  itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
  shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
};

/** The `shoppingList` to be created by this mutation. */
export type ItemShoppingListShoppingListIdFkeyShoppingListCreateInput = {
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** A connection to a list of `ShoppingList` values, with data from `ItemShoppingListHistory`. */
export type ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyConnection =
  {
    __typename?: "ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyConnection";
    /** A list of edges which contains the `ShoppingList`, info from the `ItemShoppingListHistory`, and the cursor to aid in pagination. */
    edges: Array<ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyEdge>;
    /** A list of `ShoppingList` objects. */
    nodes: Array<Maybe<ShoppingList>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `ShoppingList` you could get from the connection. */
    totalCount: Scalars["Int"];
  };

/** A `ShoppingList` edge in the connection, with data from `ItemShoppingListHistory`. */
export type ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyEdge =
  {
    __typename?: "ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyEdge";
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars["Cursor"]>;
    /** Reads and enables pagination through a set of `ItemShoppingListHistory`. */
    itemShoppingListHistories: ItemShoppingListHistoriesConnection;
    /** The `ShoppingList` at the end of the edge. */
    node?: Maybe<ShoppingList>;
  };

/** A `ShoppingList` edge in the connection, with data from `ItemShoppingListHistory`. */
export type ItemShoppingListsByItemShoppingListHistoryItemIdAndShoppingListIdManyToManyEdgeItemShoppingListHistoriesArgs =
  {
    after?: InputMaybe<Scalars["Cursor"]>;
    before?: InputMaybe<Scalars["Cursor"]>;
    condition?: InputMaybe<ItemShoppingListHistoryCondition>;
    filter?: InputMaybe<ItemShoppingListHistoryFilter>;
    first?: InputMaybe<Scalars["Int"]>;
    last?: InputMaybe<Scalars["Int"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Array<ItemShoppingListHistoriesOrderBy>>;
  };

/** A connection to a list of `ShoppingList` values, with data from `ItemShoppingList`. */
export type ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyConnection =
  {
    __typename?: "ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyConnection";
    /** A list of edges which contains the `ShoppingList`, info from the `ItemShoppingList`, and the cursor to aid in pagination. */
    edges: Array<ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyEdge>;
    /** A list of `ShoppingList` objects. */
    nodes: Array<Maybe<ShoppingList>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `ShoppingList` you could get from the connection. */
    totalCount: Scalars["Int"];
  };

/** A `ShoppingList` edge in the connection, with data from `ItemShoppingList`. */
export type ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyEdge =
  {
    __typename?: "ItemShoppingListsByItemShoppingListItemIdAndShoppingListIdManyToManyEdge";
    additionalInformations?: Maybe<Scalars["String"]>;
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars["Cursor"]>;
    /** The `ShoppingList` at the end of the edge. */
    node?: Maybe<ShoppingList>;
  };

/** A connection to a list of `ItemShoppingList` values. */
export type ItemShoppingListsConnection = {
  __typename?: "ItemShoppingListsConnection";
  /** A list of edges which contains the `ItemShoppingList` and cursor to aid in pagination. */
  edges: Array<ItemShoppingListsEdge>;
  /** A list of `ItemShoppingList` objects. */
  nodes: Array<Maybe<ItemShoppingList>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItemShoppingList` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `ItemShoppingList` edge in the connection. */
export type ItemShoppingListsEdge = {
  __typename?: "ItemShoppingListsEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `ItemShoppingList` at the end of the edge. */
  node?: Maybe<ItemShoppingList>;
};

/** Methods to use when ordering `ItemShoppingList`. */
export enum ItemShoppingListsOrderBy {
  AdditionalInformationsAsc = "ADDITIONAL_INFORMATIONS_ASC",
  AdditionalInformationsDesc = "ADDITIONAL_INFORMATIONS_DESC",
  ItemIdAsc = "ITEM_ID_ASC",
  ItemIdDesc = "ITEM_ID_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
  ShoppingListIdAsc = "SHOPPING_LIST_ID_ASC",
  ShoppingListIdDesc = "SHOPPING_LIST_ID_DESC",
}

/** A connection to a list of `Item` values. */
export type ItemsConnection = {
  __typename?: "ItemsConnection";
  /** A list of edges which contains the `Item` and cursor to aid in pagination. */
  edges: Array<ItemsEdge>;
  /** A list of `Item` objects. */
  nodes: Array<Maybe<Item>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Item` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `Item` edge in the connection. */
export type ItemsEdge = {
  __typename?: "ItemsEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `Item` at the end of the edge. */
  node?: Maybe<Item>;
};

/** Methods to use when ordering `Item`. */
export enum ItemsOrderBy {
  CategoryIdAsc = "CATEGORY_ID_ASC",
  CategoryIdDesc = "CATEGORY_ID_DESC",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: "Mutation";
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>;
  /** Creates a single `Item`. */
  createItem?: Maybe<CreateItemPayload>;
  /** Creates a single `ItemCategory`. */
  createItemCategory?: Maybe<CreateItemCategoryPayload>;
  /** Creates a single `ItemShoppingList`. */
  createItemShoppingList?: Maybe<CreateItemShoppingListPayload>;
  /** Creates a single `ShoppingList`. */
  createShoppingList?: Maybe<CreateShoppingListPayload>;
  /** Creates a single `UsedToken`. */
  createUsedToken?: Maybe<CreateUsedTokenPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByGoogleId?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccountByNodeId?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Item` using a unique key. */
  deleteItem?: Maybe<DeleteItemPayload>;
  /** Deletes a single `Item` using a unique key. */
  deleteItemByName?: Maybe<DeleteItemPayload>;
  /** Deletes a single `Item` using its globally unique id. */
  deleteItemByNodeId?: Maybe<DeleteItemPayload>;
  /** Deletes a single `ItemCategory` using a unique key. */
  deleteItemCategory?: Maybe<DeleteItemCategoryPayload>;
  /** Deletes a single `ItemCategory` using its globally unique id. */
  deleteItemCategoryByNodeId?: Maybe<DeleteItemCategoryPayload>;
  /** Deletes a single `ItemShoppingList` using a unique key. */
  deleteItemShoppingList?: Maybe<DeleteItemShoppingListPayload>;
  /** Deletes a single `ItemShoppingList` using its globally unique id. */
  deleteItemShoppingListByNodeId?: Maybe<DeleteItemShoppingListPayload>;
  /** Deletes a single `ShoppingList` using a unique key. */
  deleteShoppingList?: Maybe<DeleteShoppingListPayload>;
  /** Deletes a single `ShoppingList` using a unique key. */
  deleteShoppingListByName?: Maybe<DeleteShoppingListPayload>;
  /** Deletes a single `ShoppingList` using its globally unique id. */
  deleteShoppingListByNodeId?: Maybe<DeleteShoppingListPayload>;
  /** Deletes a single `UsedToken` using a unique key. */
  deleteUsedToken?: Maybe<DeleteUsedTokenPayload>;
  /** Deletes a single `UsedToken` using its globally unique id. */
  deleteUsedTokenByNodeId?: Maybe<DeleteUsedTokenPayload>;
  dieselManageUpdatedAt?: Maybe<DieselManageUpdatedAtPayload>;
  loginUserByGoogleIdToken?: Maybe<TokenPayload>;
  refreshToken?: Maybe<TokenPayload>;
  registerUserByGoogleIdToken?: Maybe<TokenPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByGoogleId?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccountByNodeId?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Item` using a unique key and a patch. */
  updateItem?: Maybe<UpdateItemPayload>;
  /** Updates a single `Item` using a unique key and a patch. */
  updateItemByName?: Maybe<UpdateItemPayload>;
  /** Updates a single `Item` using its globally unique id and a patch. */
  updateItemByNodeId?: Maybe<UpdateItemPayload>;
  /** Updates a single `ItemCategory` using a unique key and a patch. */
  updateItemCategory?: Maybe<UpdateItemCategoryPayload>;
  /** Updates a single `ItemCategory` using its globally unique id and a patch. */
  updateItemCategoryByNodeId?: Maybe<UpdateItemCategoryPayload>;
  /** Updates a single `ItemShoppingList` using a unique key and a patch. */
  updateItemShoppingList?: Maybe<UpdateItemShoppingListPayload>;
  /** Updates a single `ItemShoppingList` using its globally unique id and a patch. */
  updateItemShoppingListByNodeId?: Maybe<UpdateItemShoppingListPayload>;
  /** Updates a single `ShoppingList` using a unique key and a patch. */
  updateShoppingList?: Maybe<UpdateShoppingListPayload>;
  /** Updates a single `ShoppingList` using a unique key and a patch. */
  updateShoppingListByName?: Maybe<UpdateShoppingListPayload>;
  /** Updates a single `ShoppingList` using its globally unique id and a patch. */
  updateShoppingListByNodeId?: Maybe<UpdateShoppingListPayload>;
  /** Updates a single `UsedToken` using a unique key and a patch. */
  updateUsedToken?: Maybe<UpdateUsedTokenPayload>;
  /** Updates a single `UsedToken` using its globally unique id and a patch. */
  updateUsedTokenByNodeId?: Maybe<UpdateUsedTokenPayload>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItemArgs = {
  input: CreateItemInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItemCategoryArgs = {
  input: CreateItemCategoryInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItemShoppingListArgs = {
  input: CreateItemShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateShoppingListArgs = {
  input: CreateShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUsedTokenArgs = {
  input: CreateUsedTokenInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByGoogleIdArgs = {
  input: DeleteAccountByGoogleIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByNodeIdArgs = {
  input: DeleteAccountByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemArgs = {
  input: DeleteItemInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemByNameArgs = {
  input: DeleteItemByNameInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemByNodeIdArgs = {
  input: DeleteItemByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemCategoryArgs = {
  input: DeleteItemCategoryInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemCategoryByNodeIdArgs = {
  input: DeleteItemCategoryByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemShoppingListArgs = {
  input: DeleteItemShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItemShoppingListByNodeIdArgs = {
  input: DeleteItemShoppingListByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteShoppingListArgs = {
  input: DeleteShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteShoppingListByNameArgs = {
  input: DeleteShoppingListByNameInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteShoppingListByNodeIdArgs = {
  input: DeleteShoppingListByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUsedTokenArgs = {
  input: DeleteUsedTokenInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUsedTokenByNodeIdArgs = {
  input: DeleteUsedTokenByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDieselManageUpdatedAtArgs = {
  input: DieselManageUpdatedAtInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginUserByGoogleIdTokenArgs = {
  input: GoogleLoginInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserByGoogleIdTokenArgs = {
  input: GoogleLoginInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByGoogleIdArgs = {
  input: UpdateAccountByGoogleIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByNodeIdArgs = {
  input: UpdateAccountByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemByNameArgs = {
  input: UpdateItemByNameInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemByNodeIdArgs = {
  input: UpdateItemByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemCategoryArgs = {
  input: UpdateItemCategoryInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemCategoryByNodeIdArgs = {
  input: UpdateItemCategoryByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemShoppingListArgs = {
  input: UpdateItemShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItemShoppingListByNodeIdArgs = {
  input: UpdateItemShoppingListByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateShoppingListArgs = {
  input: UpdateShoppingListInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateShoppingListByNameArgs = {
  input: UpdateShoppingListByNameInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateShoppingListByNodeIdArgs = {
  input: UpdateShoppingListByNodeIdInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUsedTokenArgs = {
  input: UpdateUsedTokenInput;
};

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUsedTokenByNodeIdArgs = {
  input: UpdateUsedTokenByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
};

export enum Origin {
  Google = "GOOGLE",
  Own = "OWN",
}

/** A filter to be used against Origin fields. All fields are combined with a logical ‘and.’ */
export type OriginFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Origin>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Origin>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Origin>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Origin>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Origin>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars["Boolean"]>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Origin>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Origin>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Origin>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Origin>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Origin>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["Cursor"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["Cursor"]>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: "Query";
  account?: Maybe<Account>;
  accountByGoogleId?: Maybe<Account>;
  /** Reads a single `Account` using its globally unique `ID`. */
  accountByNodeId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Account`. */
  accounts?: Maybe<AccountsConnection>;
  item?: Maybe<Item>;
  itemByName?: Maybe<Item>;
  /** Reads a single `Item` using its globally unique `ID`. */
  itemByNodeId?: Maybe<Item>;
  /** Reads and enables pagination through a set of `ItemCategory`. */
  itemCategories?: Maybe<ItemCategoriesConnection>;
  itemCategory?: Maybe<ItemCategory>;
  /** Reads a single `ItemCategory` using its globally unique `ID`. */
  itemCategoryByNodeId?: Maybe<ItemCategory>;
  itemShoppingList?: Maybe<ItemShoppingList>;
  /** Reads a single `ItemShoppingList` using its globally unique `ID`. */
  itemShoppingListByNodeId?: Maybe<ItemShoppingList>;
  /** Reads and enables pagination through a set of `ItemShoppingListHistory`. */
  itemShoppingListHistories?: Maybe<ItemShoppingListHistoriesConnection>;
  itemShoppingListHistory?: Maybe<ItemShoppingListHistory>;
  /** Reads a single `ItemShoppingListHistory` using its globally unique `ID`. */
  itemShoppingListHistoryByNodeId?: Maybe<ItemShoppingListHistory>;
  /** Reads and enables pagination through a set of `ItemShoppingList`. */
  itemShoppingLists?: Maybe<ItemShoppingListsConnection>;
  /** Reads and enables pagination through a set of `Item`. */
  items?: Maybe<ItemsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars["ID"];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  shoppingList?: Maybe<ShoppingList>;
  shoppingListByName?: Maybe<ShoppingList>;
  /** Reads a single `ShoppingList` using its globally unique `ID`. */
  shoppingListByNodeId?: Maybe<ShoppingList>;
  /** Reads and enables pagination through a set of `ShoppingList`. */
  shoppingLists?: Maybe<ShoppingListsConnection>;
  usedToken?: Maybe<UsedToken>;
  /** Reads a single `UsedToken` using its globally unique `ID`. */
  usedTokenByNodeId?: Maybe<UsedToken>;
  /** Reads and enables pagination through a set of `UsedToken`. */
  usedTokens?: Maybe<UsedTokensConnection>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  id: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryAccountByGoogleIdArgs = {
  googleId: Scalars["BigInt"];
};

/** The root query type which gives access points into the data universe. */
export type QueryAccountByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryItemArgs = {
  id: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemByNameArgs = {
  name: Scalars["String"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemCategoriesArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemCategoryCondition>;
  filter?: InputMaybe<ItemCategoryFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemCategoriesOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryItemCategoryArgs = {
  id: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemCategoryByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListArgs = {
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListHistoriesArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListHistoryCondition>;
  filter?: InputMaybe<ItemShoppingListHistoryFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListHistoriesOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListHistoryArgs = {
  id: Scalars["UUID"];
  itemId: Scalars["UUID"];
  shoppingListId: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListHistoryByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryItemShoppingListsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListCondition>;
  filter?: InputMaybe<ItemShoppingListFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryItemsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemCondition>;
  filter?: InputMaybe<ItemFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryShoppingListArgs = {
  id: Scalars["UUID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryShoppingListByNameArgs = {
  name: Scalars["String"];
};

/** The root query type which gives access points into the data universe. */
export type QueryShoppingListByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryShoppingListsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ShoppingListCondition>;
  filter?: InputMaybe<ShoppingListFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
};

/** The root query type which gives access points into the data universe. */
export type QueryUsedTokenArgs = {
  tokenHash: Scalars["String"];
  tokenType: Origin;
};

/** The root query type which gives access points into the data universe. */
export type QueryUsedTokenByNodeIdArgs = {
  nodeId: Scalars["ID"];
};

/** The root query type which gives access points into the data universe. */
export type QueryUsedTokensArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<UsedTokenCondition>;
  filter?: InputMaybe<UsedTokenFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<UsedTokensOrderBy>>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars["String"];
};

export type ShoppingList = Node & {
  __typename?: "ShoppingList";
  id: Scalars["UUID"];
  /** Reads and enables pagination through a set of `ItemShoppingListHistory`. */
  itemShoppingListHistories: ItemShoppingListHistoriesConnection;
  /** Reads and enables pagination through a set of `ItemShoppingList`. */
  itemShoppingLists: ItemShoppingListsConnection;
  /** Reads and enables pagination through a set of `Item`. */
  itemsByItemShoppingListHistoryShoppingListIdAndItemId: ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Item`. */
  itemsByItemShoppingListShoppingListIdAndItemId: ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyConnection;
  name: Scalars["String"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
};

export type ShoppingListItemShoppingListHistoriesArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListHistoryCondition>;
  filter?: InputMaybe<ItemShoppingListHistoryFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListHistoriesOrderBy>>;
};

export type ShoppingListItemShoppingListsArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemShoppingListCondition>;
  filter?: InputMaybe<ItemShoppingListFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

export type ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdArgs =
  {
    after?: InputMaybe<Scalars["Cursor"]>;
    before?: InputMaybe<Scalars["Cursor"]>;
    condition?: InputMaybe<ItemCondition>;
    filter?: InputMaybe<ItemFilter>;
    first?: InputMaybe<Scalars["Int"]>;
    last?: InputMaybe<Scalars["Int"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Array<ItemsOrderBy>>;
  };

export type ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  condition?: InputMaybe<ItemCondition>;
  filter?: InputMaybe<ItemFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/**
 * A condition to be used against `ShoppingList` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ShoppingListCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["UUID"]>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars["String"]>;
};

/** A filter to be used against `ShoppingList` object types. All fields are combined with a logical ‘and.’ */
export type ShoppingListFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ShoppingListFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ShoppingListFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ShoppingListFilter>>;
};

/** An input for mutations affecting `ShoppingList` */
export type ShoppingListInput = {
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
  name: Scalars["String"];
};

/** A connection to a list of `Item` values, with data from `ItemShoppingListHistory`. */
export type ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyConnection =
  {
    __typename?: "ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyConnection";
    /** A list of edges which contains the `Item`, info from the `ItemShoppingListHistory`, and the cursor to aid in pagination. */
    edges: Array<ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyEdge>;
    /** A list of `Item` objects. */
    nodes: Array<Maybe<Item>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Item` you could get from the connection. */
    totalCount: Scalars["Int"];
  };

/** A `Item` edge in the connection, with data from `ItemShoppingListHistory`. */
export type ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyEdge =
  {
    __typename?: "ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyEdge";
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars["Cursor"]>;
    /** Reads and enables pagination through a set of `ItemShoppingListHistory`. */
    itemShoppingListHistories: ItemShoppingListHistoriesConnection;
    /** The `Item` at the end of the edge. */
    node?: Maybe<Item>;
  };

/** A `Item` edge in the connection, with data from `ItemShoppingListHistory`. */
export type ShoppingListItemsByItemShoppingListHistoryShoppingListIdAndItemIdManyToManyEdgeItemShoppingListHistoriesArgs =
  {
    after?: InputMaybe<Scalars["Cursor"]>;
    before?: InputMaybe<Scalars["Cursor"]>;
    condition?: InputMaybe<ItemShoppingListHistoryCondition>;
    filter?: InputMaybe<ItemShoppingListHistoryFilter>;
    first?: InputMaybe<Scalars["Int"]>;
    last?: InputMaybe<Scalars["Int"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Array<ItemShoppingListHistoriesOrderBy>>;
  };

/** A connection to a list of `Item` values, with data from `ItemShoppingList`. */
export type ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyConnection =
  {
    __typename?: "ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyConnection";
    /** A list of edges which contains the `Item`, info from the `ItemShoppingList`, and the cursor to aid in pagination. */
    edges: Array<ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyEdge>;
    /** A list of `Item` objects. */
    nodes: Array<Maybe<Item>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Item` you could get from the connection. */
    totalCount: Scalars["Int"];
  };

/** A `Item` edge in the connection, with data from `ItemShoppingList`. */
export type ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyEdge =
  {
    __typename?: "ShoppingListItemsByItemShoppingListShoppingListIdAndItemIdManyToManyEdge";
    additionalInformations?: Maybe<Scalars["String"]>;
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars["Cursor"]>;
    /** The `Item` at the end of the edge. */
    node?: Maybe<Item>;
  };

/** The globally unique `ID` look up for the row to connect. */
export type ShoppingListNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `shoppingList` to be connected. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to delete. */
export type ShoppingListNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `shoppingList` to be deleted. */
  nodeId: Scalars["ID"];
};

/** The globally unique `ID` look up for the row to update. */
export type ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `itemShoppingList` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `itemShoppingList` being updated. */
    patch: ItemShoppingListPatch;
  };

/** The fields on `shoppingList` to look up the row to update. */
export type ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingShoppingListPkeyUpdate =
  {
    id: Scalars["UUID"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: UpdateShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyPatch;
  };

/** The fields on `shoppingList` to look up the row to update. */
export type ShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyUsingShoppingListShoppingListNameKeyUpdate =
  {
    name: Scalars["String"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: UpdateShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyPatch;
  };

/** The globally unique `ID` look up for the row to update. */
export type ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyNodeIdUpdate =
  {
    /** The globally unique `ID` which identifies a single `itemShoppingListHistory` to be connected. */
    nodeId: Scalars["ID"];
    /** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
    patch: ItemShoppingListHistoryPatch;
  };

/** The fields on `shoppingList` to look up the row to update. */
export type ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingShoppingListPkeyUpdate =
  {
    id: Scalars["UUID"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: UpdateShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyPatch;
  };

/** The fields on `shoppingList` to look up the row to update. */
export type ShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyUsingShoppingListShoppingListNameKeyUpdate =
  {
    name: Scalars["String"];
    /** An object where the defined keys will be set on the `shoppingList` being updated. */
    patch: UpdateShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyPatch;
  };

/** Represents an update to a `ShoppingList`. Fields that are set will be updated. */
export type ShoppingListPatch = {
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

/** The fields on `shoppingList` to look up the row to connect. */
export type ShoppingListShoppingListPkeyConnect = {
  id: Scalars["UUID"];
};

/** The fields on `shoppingList` to look up the row to delete. */
export type ShoppingListShoppingListPkeyDelete = {
  id: Scalars["UUID"];
};

/** The fields on `shoppingList` to look up the row to connect. */
export type ShoppingListShoppingListShoppingListNameKeyConnect = {
  name: Scalars["String"];
};

/** The fields on `shoppingList` to look up the row to delete. */
export type ShoppingListShoppingListShoppingListNameKeyDelete = {
  name: Scalars["String"];
};

/** A connection to a list of `ShoppingList` values. */
export type ShoppingListsConnection = {
  __typename?: "ShoppingListsConnection";
  /** A list of edges which contains the `ShoppingList` and cursor to aid in pagination. */
  edges: Array<ShoppingListsEdge>;
  /** A list of `ShoppingList` objects. */
  nodes: Array<Maybe<ShoppingList>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ShoppingList` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `ShoppingList` edge in the connection. */
export type ShoppingListsEdge = {
  __typename?: "ShoppingListsEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `ShoppingList` at the end of the edge. */
  node?: Maybe<ShoppingList>;
};

/** Methods to use when ordering `ShoppingList`. */
export enum ShoppingListsOrderBy {
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars["String"]>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars["String"]>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars["String"]>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars["String"]>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars["String"]>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars["String"]>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars["String"]>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars["String"]>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars["String"]>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars["String"]>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars["String"]>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars["String"]>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars["String"]>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars["String"]>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars["Boolean"]>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars["String"]>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars["String"]>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars["String"]>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars["String"]>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars["String"]>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars["String"]>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars["String"]>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars["String"]>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars["String"]>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars["String"]>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars["String"]>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars["String"]>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars["String"]>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars["String"]>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars["String"]>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars["String"]>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars["String"]>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars["String"]>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars["String"]>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars["String"]>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars["String"]>;
};

export type TokenPayload = {
  __typename?: "TokenPayload";
  authToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars["UUID"]>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars["UUID"]>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars["UUID"]>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars["UUID"]>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars["UUID"]>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars["Boolean"]>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars["UUID"]>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars["UUID"]>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars["UUID"]>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars["UUID"]>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars["UUID"]>>;
};

/** All input for the `updateAccountByGoogleId` mutation. */
export type UpdateAccountByGoogleIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  googleId: Scalars["BigInt"];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** All input for the `updateAccountByNodeId` mutation. */
export type UpdateAccountByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: "UpdateAccountPayload";
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
};

/** All input for the `updateItemByName` mutation. */
export type UpdateItemByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  /** An object where the defined keys will be set on the `Item` being updated. */
  patch: ItemPatch;
};

/** All input for the `updateItemByNodeId` mutation. */
export type UpdateItemByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `Item` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `Item` being updated. */
  patch: ItemPatch;
};

/** All input for the `updateItemCategoryByNodeId` mutation. */
export type UpdateItemCategoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ItemCategory` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `ItemCategory` being updated. */
  patch: ItemCategoryPatch;
};

/** All input for the `updateItemCategory` mutation. */
export type UpdateItemCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  /** An object where the defined keys will be set on the `ItemCategory` being updated. */
  patch: ItemCategoryPatch;
};

/** The output of our update `ItemCategory` mutation. */
export type UpdateItemCategoryPayload = {
  __typename?: "UpdateItemCategoryPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `ItemCategory` that was updated by this mutation. */
  itemCategory?: Maybe<ItemCategory>;
  /** An edge for our `ItemCategory`. May be used by Relay 1. */
  itemCategoryEdge?: Maybe<ItemCategoriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our update `ItemCategory` mutation. */
export type UpdateItemCategoryPayloadItemCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemCategoriesOrderBy>>;
};

/** All input for the `updateItem` mutation. */
export type UpdateItemInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  /** An object where the defined keys will be set on the `Item` being updated. */
  patch: ItemPatch;
};

/** The output of our update `Item` mutation. */
export type UpdateItemPayload = {
  __typename?: "UpdateItemPayload";
  /** Reads a single `ItemCategory` that is related to this `Item`. */
  category?: Maybe<ItemCategory>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** The `Item` that was updated by this mutation. */
  item?: Maybe<Item>;
  /** An edge for our `Item`. May be used by Relay 1. */
  itemEdge?: Maybe<ItemsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The output of our update `Item` mutation. */
export type UpdateItemPayloadItemEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemsOrderBy>>;
};

/** All input for the `updateItemShoppingListByNodeId` mutation. */
export type UpdateItemShoppingListByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ItemShoppingList` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `ItemShoppingList` being updated. */
  patch: ItemShoppingListPatch;
};

/** All input for the `updateItemShoppingList` mutation. */
export type UpdateItemShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  itemId: Scalars["UUID"];
  /** An object where the defined keys will be set on the `ItemShoppingList` being updated. */
  patch: ItemShoppingListPatch;
  shoppingListId: Scalars["UUID"];
};

/** The output of our update `ItemShoppingList` mutation. */
export type UpdateItemShoppingListPayload = {
  __typename?: "UpdateItemShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Reads a single `Item` that is related to this `ItemShoppingList`. */
  item?: Maybe<Item>;
  /** The `ItemShoppingList` that was updated by this mutation. */
  itemShoppingList?: Maybe<ItemShoppingList>;
  /** An edge for our `ItemShoppingList`. May be used by Relay 1. */
  itemShoppingListEdge?: Maybe<ItemShoppingListsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `ShoppingList` that is related to this `ItemShoppingList`. */
  shoppingList?: Maybe<ShoppingList>;
};

/** The output of our update `ItemShoppingList` mutation. */
export type UpdateItemShoppingListPayloadItemShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ItemShoppingListsOrderBy>>;
};

/** All input for the `updateShoppingListByName` mutation. */
export type UpdateShoppingListByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  /** An object where the defined keys will be set on the `ShoppingList` being updated. */
  patch: ShoppingListPatch;
};

/** All input for the `updateShoppingListByNodeId` mutation. */
export type UpdateShoppingListByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `ShoppingList` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `ShoppingList` being updated. */
  patch: ShoppingListPatch;
};

/** All input for the `updateShoppingList` mutation. */
export type UpdateShoppingListInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  /** An object where the defined keys will be set on the `ShoppingList` being updated. */
  patch: ShoppingListPatch;
};

/** The output of our update `ShoppingList` mutation. */
export type UpdateShoppingListPayload = {
  __typename?: "UpdateShoppingListPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `ShoppingList` that was updated by this mutation. */
  shoppingList?: Maybe<ShoppingList>;
  /** An edge for our `ShoppingList`. May be used by Relay 1. */
  shoppingListEdge?: Maybe<ShoppingListsEdge>;
};

/** The output of our update `ShoppingList` mutation. */
export type UpdateShoppingListPayloadShoppingListEdgeArgs = {
  orderBy?: InputMaybe<Array<ShoppingListsOrderBy>>;
};

/** All input for the `updateUsedTokenByNodeId` mutation. */
export type UpdateUsedTokenByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The globally unique `ID` which will identify a single `UsedToken` to be updated. */
  nodeId: Scalars["ID"];
  /** An object where the defined keys will be set on the `UsedToken` being updated. */
  patch: UsedTokenPatch;
};

/** All input for the `updateUsedToken` mutation. */
export type UpdateUsedTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** An object where the defined keys will be set on the `UsedToken` being updated. */
  patch: UsedTokenPatch;
  tokenHash: Scalars["String"];
  tokenType: Origin;
};

/** The output of our update `UsedToken` mutation. */
export type UpdateUsedTokenPayload = {
  __typename?: "UpdateUsedTokenPayload";
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars["String"]>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UsedToken` that was updated by this mutation. */
  usedToken?: Maybe<UsedToken>;
  /** An edge for our `UsedToken`. May be used by Relay 1. */
  usedTokenEdge?: Maybe<UsedTokensEdge>;
};

/** The output of our update `UsedToken` mutation. */
export type UpdateUsedTokenPayloadUsedTokenEdgeArgs = {
  orderBy?: InputMaybe<Array<UsedTokensOrderBy>>;
};

export type UsedToken = Node & {
  __typename?: "UsedToken";
  fromDate: Scalars["Datetime"];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars["ID"];
  tokenHash: Scalars["String"];
  tokenType: Origin;
};

/**
 * A condition to be used against `UsedToken` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UsedTokenCondition = {
  /** Checks for equality with the object’s `fromDate` field. */
  fromDate?: InputMaybe<Scalars["Datetime"]>;
  /** Checks for equality with the object’s `tokenHash` field. */
  tokenHash?: InputMaybe<Scalars["String"]>;
  /** Checks for equality with the object’s `tokenType` field. */
  tokenType?: InputMaybe<Origin>;
};

/** A filter to be used against `UsedToken` object types. All fields are combined with a logical ‘and.’ */
export type UsedTokenFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UsedTokenFilter>>;
  /** Filter by the object’s `fromDate` field. */
  fromDate?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UsedTokenFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UsedTokenFilter>>;
  /** Filter by the object’s `tokenHash` field. */
  tokenHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenType` field. */
  tokenType?: InputMaybe<OriginFilter>;
};

/** An input for mutations affecting `UsedToken` */
export type UsedTokenInput = {
  fromDate?: InputMaybe<Scalars["Datetime"]>;
  tokenHash: Scalars["String"];
  tokenType: Origin;
};

/** Represents an update to a `UsedToken`. Fields that are set will be updated. */
export type UsedTokenPatch = {
  fromDate?: InputMaybe<Scalars["Datetime"]>;
  tokenHash?: InputMaybe<Scalars["String"]>;
  tokenType?: InputMaybe<Origin>;
};

/** A connection to a list of `UsedToken` values. */
export type UsedTokensConnection = {
  __typename?: "UsedTokensConnection";
  /** A list of edges which contains the `UsedToken` and cursor to aid in pagination. */
  edges: Array<UsedTokensEdge>;
  /** A list of `UsedToken` objects. */
  nodes: Array<Maybe<UsedToken>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UsedToken` you could get from the connection. */
  totalCount: Scalars["Int"];
};

/** A `UsedToken` edge in the connection. */
export type UsedTokensEdge = {
  __typename?: "UsedTokensEdge";
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars["Cursor"]>;
  /** The `UsedToken` at the end of the edge. */
  node?: Maybe<UsedToken>;
};

/** Methods to use when ordering `UsedToken`. */
export enum UsedTokensOrderBy {
  FromDateAsc = "FROM_DATE_ASC",
  FromDateDesc = "FROM_DATE_DESC",
  Natural = "NATURAL",
  PrimaryKeyAsc = "PRIMARY_KEY_ASC",
  PrimaryKeyDesc = "PRIMARY_KEY_DESC",
  TokenHashAsc = "TOKEN_HASH_ASC",
  TokenHashDesc = "TOKEN_HASH_DESC",
  TokenTypeAsc = "TOKEN_TYPE_ASC",
  TokenTypeDesc = "TOKEN_TYPE_DESC",
}

/** An object where the defined keys will be set on the `itemCategory` being updated. */
export type UpdateItemCategoryOnItemForItemCategoryIdFkeyPatch = {
  itemsUsingId?: InputMaybe<ItemCategoryIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

/** An object where the defined keys will be set on the `item` being updated. */
export type UpdateItemOnItemForItemCategoryIdFkeyPatch = {
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

/** An object where the defined keys will be set on the `item` being updated. */
export type UpdateItemOnItemShoppingListForItemShoppingListItemIdFkeyPatch = {
  categoryId?: InputMaybe<Scalars["UUID"]>;
  itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
  itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
  itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
  name?: InputMaybe<Scalars["String"]>;
};

/** An object where the defined keys will be set on the `item` being updated. */
export type UpdateItemOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyPatch =
  {
    categoryId?: InputMaybe<Scalars["UUID"]>;
    itemCategoryToCategoryId?: InputMaybe<ItemCategoryIdFkeyInput>;
    itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInverseInput>;
    itemShoppingListsUsingId?: InputMaybe<ItemShoppingListItemIdFkeyInverseInput>;
    name?: InputMaybe<Scalars["String"]>;
  };

/** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
export type UpdateItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryItemIdFkeyPatch =
  {
    additionalInformations?: InputMaybe<Scalars["String"]>;
    id?: InputMaybe<Scalars["UUID"]>;
    itemToItemId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInput>;
    shoppingListId?: InputMaybe<Scalars["UUID"]>;
    shoppingListToShoppingListId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInput>;
  };

/** An object where the defined keys will be set on the `itemShoppingListHistory` being updated. */
export type UpdateItemShoppingListHistoryOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyPatch =
  {
    additionalInformations?: InputMaybe<Scalars["String"]>;
    id?: InputMaybe<Scalars["UUID"]>;
    itemId?: InputMaybe<Scalars["UUID"]>;
    itemToItemId?: InputMaybe<ItemShoppingListHistoryItemIdFkeyInput>;
    shoppingListToShoppingListId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInput>;
  };

/** An object where the defined keys will be set on the `itemShoppingList` being updated. */
export type UpdateItemShoppingListOnItemShoppingListForItemShoppingListItemIdFkeyPatch =
  {
    additionalInformations?: InputMaybe<Scalars["String"]>;
    itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
    shoppingListId?: InputMaybe<Scalars["UUID"]>;
    shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
  };

/** An object where the defined keys will be set on the `itemShoppingList` being updated. */
export type UpdateItemShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyPatch =
  {
    additionalInformations?: InputMaybe<Scalars["String"]>;
    itemId?: InputMaybe<Scalars["UUID"]>;
    itemToItemId?: InputMaybe<ItemShoppingListItemIdFkeyInput>;
    shoppingListToShoppingListId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInput>;
  };

/** An object where the defined keys will be set on the `shoppingList` being updated. */
export type UpdateShoppingListOnItemShoppingListForItemShoppingListShoppingListIdFkeyPatch =
  {
    itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
    itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
    name?: InputMaybe<Scalars["String"]>;
  };

/** An object where the defined keys will be set on the `shoppingList` being updated. */
export type UpdateShoppingListOnItemShoppingListHistoryForItemShoppingListHistoryShoppingListIdFkeyPatch =
  {
    itemShoppingListHistoriesUsingId?: InputMaybe<ItemShoppingListHistoryShoppingListIdFkeyInverseInput>;
    itemShoppingListsUsingId?: InputMaybe<ItemShoppingListShoppingListIdFkeyInverseInput>;
    name?: InputMaybe<Scalars["String"]>;
  };
