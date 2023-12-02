import {
  AllFilmsQuery,
  TypedDocumentString,
} from "@/lib/graphql/generated/graphql";
import { allFilmsQueryDocument } from "@/lib/graphql/queries/AllFilms";
import { GraphQLError } from "graphql";

type GraphQLResponse<GraphQLData> =
  | { data: GraphQLData }
  | { errors: GraphQLError[] };

const fetchData = async <Result, Variables>(
  document: TypedDocumentString<Result, Variables>
) => {
  const response = await fetch(
    "https://swapi-graphql.netlify.app/.netlify/functions/index",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: allFilmsQueryDocument.toString(),
      }),
    }
  );

  const result = (await response.json()) as GraphQLResponse<Result>;

  if ("errors" in result) {
    throw new Error(result.errors[0].message);
  }

  return result?.data;
};

export default async function Home() {
  const data: AllFilmsQuery = await fetchData(allFilmsQueryDocument);
  return (
    <main className="font-mono text-xl p-24">
      <h2 className="p-12">Star Wars</h2>
      <div className="w-full max-w-5xl items-center justify-between lg:flex">
        <table className="border border-slate-400 border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-300 border-spacing-2">Movie</th>
              <th className="border border-slate-300 border-spacing-2">Director</th>
              <th className="border border-slate-300 border-spacing-2">Release Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.allFilms?.films?.map((item) => {
              return (
                <tr key={item?.title}>
                  <td className="border border-slate-300 border-spacing-2">{item?.title}</td>
                  <td className="border border-slate-300 border-spacing-2">{item?.director}</td>
                  <td className="border border-slate-300 border-spacing-2">{item?.releaseDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
