import CharacterCard from "@/components/characters/CharacterCard";
import CharactersPagination from "@/components/characters/CharactersPagination";
import PageError from "@/components/shared/PageError";
import PageTitle from "@/components/shared/PageTitle";
import { DEFAULT_SEO } from "@/constants/seo";
import client from "@/lib/gql/apolloClient";
import { GET_CHARACTERS_QUERY } from "@/lib/gql/queries";
import { GetCharactersData } from "@/types/characters";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = (await searchParams)?.page || "1";
  const pageNum = Number.parseInt(page, 10) || 1;
  const title = pageNum > 1 ? `Information — Page ${pageNum}` : "Information";
  const canonical =
    pageNum > 1 ? `/information?page=${pageNum}` : "/information";

  return {
    title,
    description: DEFAULT_SEO.description.information,
    alternates: { canonical },
    openGraph: {
      title,
      description: DEFAULT_SEO.description.information,
      url: canonical,
    },
    twitter: {
      title,
      description: DEFAULT_SEO.description.information,
    },
  };
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let characters: GetCharactersData["characters"]["results"] = [];
  let totalPages = 1;
  let error: Error | null = null;

  try {
    const { data } = await client.query<GetCharactersData>({
      query: GET_CHARACTERS_QUERY,
      variables: { page: currentPage },
    });
    characters = data?.characters?.results || [];
    totalPages = data?.characters?.info?.pages || 1;
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
      <PageTitle>Information</PageTitle>
      <p className="text-lg text-gray-800 dark:text-gray-50 mb-4">
        Explore characters from the Rick and Morty universe. Select any
        character to see additional information.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <CharactersPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
