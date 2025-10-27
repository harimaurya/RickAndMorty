import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GetCharactersDocument } from "@/app/gql/graphql";
import CharactersPage, { generateMetadata } from "./page";

// Mocks
vi.mock("@/lib/gql/apolloClient");

import client from "@/lib/gql/apolloClient";
import { CharacterCardProps } from "@/components/characters/CharacterCard";
import { CharactersPaginationProps } from "@/components/characters/CharactersPagination";
import { PageErrorProps } from "@/components/shared/PageError";
import { PageTitleProps } from "@/components/shared/PageTitle";

vi.mock("@/app/gql/graphql", () => {
  const doc = {};
  return {
    GetCharactersDocument: doc,
  };
});

vi.mock("@/constants/seo", () => ({
  DEFAULT_SEO: {
    description: {
      information: "Info description",
    },
  },
}));

vi.mock("@/components/characters/CharacterCard", () => ({
  default: (props: CharacterCardProps) =>
    React.createElement(
      "div",
      { "data-testid": "card", "data-id": props?.character?.id },
      `Card:${props?.character?.name}`
    ),
}));

vi.mock("@/components/characters/CharactersPagination", () => ({
  default: (props: CharactersPaginationProps) =>
    React.createElement(
      "div",
      { "data-testid": "pagination" },
      `page:${props?.currentPage}/${props?.totalPages}`
    ),
}));

vi.mock("@/components/shared/PageError", () => ({
  default: (props: PageErrorProps) =>
    React.createElement(
      "div",
      { role: "alert" },
      React.createElement("h2", null, props?.title),
      React.createElement("p", null, props?.description)
    ),
}));

vi.mock("@/components/shared/PageTitle", () => ({
  default: (props: PageTitleProps) =>
    React.createElement("h1", null, props?.children),
}));

describe("/information route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (client.query as ReturnType<typeof vi.fn>).mockReset();
  });

  describe("generateMetadata", () => {
    it("returns default metadata for first page when no page is provided", async () => {
      const meta = await generateMetadata({
        searchParams: {} as { page?: string },
      });

      expect(meta.title).toBe("Information");
      expect(meta.description).toBe("Info description");
      expect(meta.alternates?.canonical).toBe("/information");
      expect(meta.openGraph?.title).toBe("Information");
      expect(meta.openGraph?.description).toBe("Info description");
      expect(meta.openGraph?.url).toBe("/information");
      expect(meta.twitter?.title).toBe("Information");
      expect(meta.twitter?.description).toBe("Info description");
    });

    it("includes page number in metadata and canonical for page > 1", async () => {
      const meta = await generateMetadata({ searchParams: { page: "3" } });

      expect(meta.title).toBe("Information — Page 3");
      expect(meta.alternates?.canonical).toBe("/information?page=3");
      expect(meta.openGraph?.title).toBe("Information — Page 3");
      expect(meta.openGraph?.url).toBe("/information?page=3");
      expect(meta.twitter?.title).toBe("Information — Page 3");
    });

    it("falls back to page 1 for invalid page values", async () => {
      const meta = await generateMetadata({ searchParams: { page: "abc" } });

      expect(meta.title).toBe("Information");
      expect(meta.alternates?.canonical).toBe("/information");
    });
  });

  describe("CharactersPage", () => {
    it("renders characters, title, description, and pagination; queries with correct variables", async () => {
      (client.query as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: {
          characters: {
            results: [
              { id: "1", name: "Rick Sanchez" },
              null,
              { id: "2", name: "Morty Smith" },
            ],
            info: { pages: 10 },
          },
        },
      });

      const element = await CharactersPage({ searchParams: { page: "3" } });
      const html = renderToStaticMarkup(element);

      expect(client.query).toHaveBeenCalledWith({
        query: GetCharactersDocument,
        variables: { page: 3 },
      });

      expect(html).toContain("<h1>Information</h1>");
      expect(html).toContain(
        "Explore characters from the Rick and Morty universe"
      );

      const cardCount = (html.match(/data-testid="card"/g) || []).length;
      expect(cardCount).toBe(2);

      expect(html).toContain("page:3/10");
    });

    it("defaults to page 1 when no page specified and renders empty state pagination", async () => {
      (client.query as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: {
          characters: {
            results: [],
            info: { pages: 1 },
          },
        },
      });

      const element = await CharactersPage({
        searchParams: {} as { page?: string },
      });
      const html = renderToStaticMarkup(element);

      expect(client.query).toHaveBeenCalledWith({
        query: GetCharactersDocument,
        variables: { page: 1 },
      });

      expect(html).toContain("page:1/1");
    });

    it("renders PageError when query fails", async () => {
      (client.query as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error("Network issue")
      );

      const element = await CharactersPage({ searchParams: { page: "2" } });
      const html = renderToStaticMarkup(element);

      expect(html).toContain("<h2>Error loading characters</h2>");
      expect(html).toContain("Network issue");
    });
  });
});
