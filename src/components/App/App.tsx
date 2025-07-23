import SearchBar from "../SearchBar/SearchBar";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import Pagination from "../Padination/Pagination";
import fetchMovies from "../../services/movieService";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && !data?.results.length) {
      toast.error("Фільми за цим запитом не знайдено.");
    }
  }, [data]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {isSuccess && data.results.length > 0 && (
        <>
          <Pagination total={data.total_pages} page={currentPage} onChange={setCurrentPage} />
          <MovieGrid movies={data.results} onSelect={handleSelect} />
        </>
      )}

      {/* {data?.results.length === 0 && toast.error("Фільми за цим запитом не знайдено.")} */}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </>
  );
}
