import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  documents: "src/lib/graphql/**/*.{gql,graphql}",
  debug: true,
  verbose: true,
  ignoreNoDocuments: true,
  watch: true,
  generates: {
    "src/lib/graphql/generated/graphql.ts/": {
      plugins: [
        "typescript",
        {
          "typescript-operations": {
            documentMode: "string",
          },
        },
      ],
    },
  },
};

export default config;
