import CharacterDetails from "@/components/characters/CharacterDetails";
import PageError from "@/components/shared/PageError";
import client from "@/lib/gql/apolloClient";
import { GET_CHARACTER_DETAIL } from "@/lib/gql/queries";
import { GetCharacterDetailData } from "@/types/characters";
import type { Metadata } from "next";

interface CharacterDetailParams {
  id: string;
}

// Generate page-specific SEO using character data
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await client.query<GetCharacterDetailData>({
      query: GET_CHARACTER_DETAIL,
      variables: { id },
    });
    const c = data?.character;
    if (!c) return { title: "Character not found" };

    const title = `${c.name} — Character`;
    const description = `${c.name} — ${c.species} · ${c.gender} · ${c.status}`;
    const url = `/information/${id}`;
    const image = c.image;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        images: image
          ? [{ url: image, width: 300, height: 300, alt: c.name }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return { title: "Character" };
  }
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
