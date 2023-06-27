import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Container,
  Column,
  Title,
  Subtitle,
  Description,
  Image,
  Loading,
} from "../Style";

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      rating
      description_full
      medium_cover_image
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Column>
        <Title>{`${data.movie.title}`}</Title>
        <Subtitle>⭐️ {data.movie.rating}</Subtitle>
        <Description>{data.movie.description_full}</Description>
      </Column>
      <Image bg={data.movie.medium_cover_image} />
    </Container>
  );
}
