import React, { useState, useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies(upcomingMoviesURL);
  }, [page]);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUpcomingMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  const handleViewDetails = (movieId) => {
    history.push(`/movie/${movieId}`);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="upcoming-movies">
      <h1 className="movies-heading">Upcoming Movies</h1>
      <MovieGrid movies={upcomingMovies} />
      <button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </button>
      <button onClick={handleNextPage}>Next</button>
      <p>{page}</p>
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
};

export default UpcomingMovies;
