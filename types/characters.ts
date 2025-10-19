export interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export interface GetCharactersData {
  characters: {
    info: {
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}

export interface GetCharacterDetailData {
  character: Character;
}
