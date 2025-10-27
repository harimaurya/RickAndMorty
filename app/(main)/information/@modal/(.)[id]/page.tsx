import { GetCharacterDetailDocument } from "@/app/gql/graphql";
import CharacterDetailsModal from "@/components/characters/CharacterDetailsModal";
import client from "@/lib/gql/apolloClient";

interface CharacterDetailModalParams {
  id: string;
}

export default async function CharacterDetailsModalPage({
  params,
}: {
  params: CharacterDetailModalParams;
}) {
  const { id } = await params;

  const { data } = await client.query({
    query: GetCharacterDetailDocument,
    variables: { id },
  });

  const character = data?.character;

  return <>{character && <CharacterDetailsModal character={character} />}</>;
}
