import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "./services/api";

interface MoviesProviderProps {
  children: ReactNode
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GeneralSupplierData {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void
  selectedGenreId: number
  selectedGenre: GenreResponseProps
  movies: MovieProps[]


}

const GeneralSupplier = createContext<GeneralSupplierData>({} as GeneralSupplierData)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <GeneralSupplier.Provider value={{ genres, handleClickButton, selectedGenreId, selectedGenre, movies }}>
      {children}
    </GeneralSupplier.Provider>
  )
}

export function useMovies() {
  const context = useContext(GeneralSupplier)

  return context
}