import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}db.json`);
        const data = await res.json();
        const found = data.movies.find((m) => m.id === Number(id));
        setMovie(found || {});
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie.id) {
    return (
      <main className="detail-page">
        <p className="loading">로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-link">
        ← 차트로 돌아가기
      </Link>

      <header className="detail-header">
        <span className="rank-badge large">#{movie.rank}</span>
        <h1 className="detail-title">{movie.title}</h1>
        <span className="genre-tag">{movie.genre}</span>
      </header>

      {movie.poster_image_url && (
        <div className="poster-wrap">
          <img
            className="poster-image"
            src={`${import.meta.env.BASE_URL}${movie.poster_image_url}`}
            alt={`${movie.title} 포스터`}
          />
        </div>
      )}

      <section className="detail-info">
        <div className="info-row">
          <span className="info-label">감독</span>
          <span className="info-value">{movie.director}</span>
        </div>

        <div className="info-row">
          <span className="info-label">출연</span>
          <div className="cast-list">
            {movie.cast?.length > 0 ? (
              movie.cast.map((name) => (
                <span key={name} className="cast-chip">
                  {name}
                </span>
              ))
            ) : (
              <span className="info-value muted">정보 없음</span>
            )}
          </div>
        </div>
      </section>

      <section className="synopsis">
        <h2>줄거리</h2>
        <p>{movie.synopsis}</p>
      </section>
    </main>
  );
};
export default MovieDetail;
