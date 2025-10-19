import CharacterDetails from "@/components/characters/CharacterDetails";
import PageError from "@/components/shared/PageError";
import client from "@/lib/gql/apolloClient";
import { GET_CHARACTER_DETAIL } from "@/lib/gql/queries";
import { GetCharacterDetailData } from "@/types/characters";

interface CharacterDetailParams {
  id: string;
}

export default async function CharacterDetailsPage({
  params,
}: {
  params: CharacterDetailParams;
}) {
  const { id } = await params;

  let character = null;
  let error: Error | null = null;

  try {
    const { data } = await client.query<GetCharacterDetailData>({
      query: GET_CHARACTER_DETAIL,
      variables: { id },
    });
    character = data?.character;
  } catch (e) {
    error = e as Error;
  }

  if (error) {
    return (
      <PageError
        title="Error loading character information"
        description={error.message}
      />
    );
  }

  return (
    <div className="container mx-auto px-4">
      {character && <CharacterDetails character={character} />}
    </div>
  );
}
