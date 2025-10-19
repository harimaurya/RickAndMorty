import CharacterCard from "@/components/characters/CharacterCard";
import PageError from "@/components/shared/PageError";
import PageTitle from "@/components/shared/PageTitle";
import client from "@/lib/gql/apolloClient";
import { GET_CHARACTERS_QUERY } from "@/lib/gql/queries";
import { GetCharactersData } from "@/types/characters";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let characters: GetCharactersData["characters"]["results"] = [];
  let error: Error | null = null;

  try {
    const { data } = await client.query<GetCharactersData>({
      query: GET_CHARACTERS_QUERY,
      variables: { page: currentPage },
    });
    characters = data?.characters?.results || [];
  } catch (e: unknown) {
    error = e as Error;
  }

  if (error) {
    return (
      <PageError title="Error loading characters" description={error.message} />
    );
  }

  return (
    <div className="container mx-auto px-4">
      <PageTitle>Characters</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
