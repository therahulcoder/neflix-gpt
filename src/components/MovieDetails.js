import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const apiKey = "1f4d2f63fbfc48b740bd17dee31eb7e1";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovie(data);

        // Fetch trailer
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        const trailerData = await trailerResponse.json();
        const youtubeTrailer = trailerData.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-center">Loading...</p>;

  return (
    <div className="absolute w-full">
      <Header />
      <div className="text-center p-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Back to List
        </button>

        <h2 className="text-2xl font-bold">Movie Title: {movie.title}</h2>
        <p className="mt-2 text-lg">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p className="mt-2 text-lg">
          <strong>Overview:</strong> {movie.overview}
        </p>

        {trailerKey && (
          <div className="mt-5">
            <h3 className="text-xl font-semibold mb-3">Trailer</h3>
            <iframe
              className="w-full h-[550px] max-w-3xl mx-auto"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
