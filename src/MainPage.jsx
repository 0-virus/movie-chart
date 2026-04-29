import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}db.json`);
        const data = await res.json();
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <main className="main-page">
      <header className="main-header">
        <p className="eyebrow">KOBIS · 2026년 4월 박스오피스</p>
        <h1>Movie Chart</h1>
        <p className="subtitle">이번 달 한국에서 가장 많이 본 영화</p>
      </header>

      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`} className="movie-card-link">
              <img
                className="poster-thumb"
                src={movie.poster_image_url}
                alt={`${movie.title} 포스터`}
                loading="lazy"
              />
              <span className="rank-badge">#{movie.rank}</span>
              <div className="movie-card-body">
                <h2 className="movie-title">{movie.title}</h2>
                <span className="genre-tag">{movie.genre}</span>
              </div>
              <span className="arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default MainPage;
