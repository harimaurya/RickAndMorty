import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["./graphql/**/*.graphql"],
  generates: {
    "./app/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: true,
      },
    },
    "./app/gql/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
