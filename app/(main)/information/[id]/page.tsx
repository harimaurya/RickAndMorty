import { GetCharacterDetailDocument } from "@/app/gql/graphql";
import { CharacterDetailInfoFragment } from "@/app/gql/types";
import CharacterDetails from "@/components/characters/CharacterDetails";
import client from "@/lib/gql/apolloClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    const { data } = await client.query({
      query: GetCharacterDetailDocument,
      variables: { id },
    });

    const character = data?.character as CharacterDetailInfoFragment | null;
    if (!character) return { title: "Character not found" };

    const title = `${character?.name} — Character`;
    const description = `${character?.name} — ${character?.species} · ${character?.gender} · ${character?.status}`;
    const url = `/information/${id}`;
    const image = character.image;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        images: image
          ? [
              {
                url: image,
                width: 300,
                height: 300,
                alt: (character.name as string) || "Character Image",
              },
            ]
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

  const { data } = await client.query({
    query: GetCharacterDetailDocument,
    variables: { id },
  });

  const character = data?.character;

  if (!character) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      {character && <CharacterDetails character={character} />}
    </div>
  );
}
