import CharacterDetailsModal from "@/components/characters/CharacterDetailsModal";
import client from "@/lib/gql/apolloClient";
import { GET_CHARACTER_DETAIL } from "@/lib/gql/queries";
import { GetCharacterDetailData } from "@/types/characters";

interface CharacterDetailModalParams {
  id: string;
}

export default async function CharacterDetailsModalPage({
  params,
}: {
  params: CharacterDetailModalParams;
}) {
  const { id } = await params;

  const { data } = await client.query<GetCharacterDetailData>({
    query: GET_CHARACTER_DETAIL,
    variables: { id },
  });

  const character = data?.character;

  return <>{character && <CharacterDetailsModal character={character} />}</>;
}
