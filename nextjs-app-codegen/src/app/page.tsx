import { allFilmsQueryDocument } from "@/lib/graphql/queries/AllFilms";

async function getData() {
  const res = await fetch(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: allFilmsQueryDocument
      }),
    }
  );

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log('data', data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-xl lg:flex">
        <h2>Star Wars</h2>
      </div>
      {JSON.stringify(data)}
    </main>
  );
}
