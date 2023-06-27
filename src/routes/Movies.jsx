import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

export default function Movies() {
  const { data, error, loading } = useQuery(ALL_MOVIES);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>can not fetch data. the reason is {error} </h1>;
  return (
    <div>
      <h1>Movie List</h1>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
