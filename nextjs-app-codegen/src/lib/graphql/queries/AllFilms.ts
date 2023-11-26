import { graphql } from "../generated/gql";

export const allFilmsQueryDocument = graphql(/* GraphQL */ `
  query AllFilms {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`);
