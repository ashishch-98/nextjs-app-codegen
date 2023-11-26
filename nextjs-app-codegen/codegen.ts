import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  documents: "./src/lib/graphql/queries/**/*.{ts,tsx}",
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/lib/graphql/generated/': {
      preset: 'client'
    }
  }
}
 
export default config;
