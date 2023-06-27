import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import {
  ListContainer,
  Header,
  Title,
  MoviesGrid,
  PosterBg,
  PosterContainer,
  Loading,
} from "../Style";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

export default function Movies() {
  const { data, error, loading } = useQuery(ALL_MOVIES);

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <h1>can not fetch data. the reason is {error} </h1>;
  return (
    <ListContainer>
      <Header>
        <Title>Random Movies from yts</Title>
      </Header>
      <MoviesGrid>
        {data.allMovies.map((movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <PosterBg background={movie.medium_cover_image} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
    </ListContainer>
  );
}
