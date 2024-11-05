import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = "1f4d2f63fbfc48b740bd17dee31eb7e1"; // Replace with your API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?primary_release_year=2024&sort_by=popularity.desc&api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute w-full text-center p-5">
      {/* Search Input */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-72 rounded border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Movies List */}
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="text-inherit no-underline"
            >
              <div className="max-w-xs text-center border border-gray-300 rounded-lg p-3">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-md"
                />
                <h3 className="text-lg mt-2">{movie.title}</h3>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center w-full">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default LatestMovies;
