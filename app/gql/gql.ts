/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CharacterInfo on Character {\n  id\n  name\n  species\n  image\n}\n\nfragment CharacterDetailInfo on Character {\n  ...CharacterInfo\n  status\n  type\n  gender\n  origin {\n    name\n  }\n  location {\n    name\n  }\n}": typeof types.CharacterInfoFragmentDoc,
    "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      pages\n      next\n      prev\n    }\n    results {\n      ...CharacterInfo\n    }\n  }\n}\n\nquery GetCharacterDetail($id: ID!) {\n  character(id: $id) {\n    ...CharacterDetailInfo\n  }\n}": typeof types.GetCharactersDocument,
};
const documents: Documents = {
    "fragment CharacterInfo on Character {\n  id\n  name\n  species\n  image\n}\n\nfragment CharacterDetailInfo on Character {\n  ...CharacterInfo\n  status\n  type\n  gender\n  origin {\n    name\n  }\n  location {\n    name\n  }\n}": types.CharacterInfoFragmentDoc,
    "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      pages\n      next\n      prev\n    }\n    results {\n      ...CharacterInfo\n    }\n  }\n}\n\nquery GetCharacterDetail($id: ID!) {\n  character(id: $id) {\n    ...CharacterDetailInfo\n  }\n}": types.GetCharactersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CharacterInfo on Character {\n  id\n  name\n  species\n  image\n}\n\nfragment CharacterDetailInfo on Character {\n  ...CharacterInfo\n  status\n  type\n  gender\n  origin {\n    name\n  }\n  location {\n    name\n  }\n}"): (typeof documents)["fragment CharacterInfo on Character {\n  id\n  name\n  species\n  image\n}\n\nfragment CharacterDetailInfo on Character {\n  ...CharacterInfo\n  status\n  type\n  gender\n  origin {\n    name\n  }\n  location {\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      pages\n      next\n      prev\n    }\n    results {\n      ...CharacterInfo\n    }\n  }\n}\n\nquery GetCharacterDetail($id: ID!) {\n  character(id: $id) {\n    ...CharacterDetailInfo\n  }\n}"): (typeof documents)["query GetCharacters($page: Int!) {\n  characters(page: $page) {\n    info {\n      pages\n      next\n      prev\n    }\n    results {\n      ...CharacterInfo\n    }\n  }\n}\n\nquery GetCharacterDetail($id: ID!) {\n  character(id: $id) {\n    ...CharacterDetailInfo\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;