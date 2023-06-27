import React from "react";
import { ApolloClient, gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Container,
  Column,
  Title,
  Subtitle,
  Description,
  Image,
  Loading,
  LikeButton,
} from "../Style";

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      rating
      description_full
      medium_cover_image
      isLiked @client
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  // 캐시 접근
  const onClick = () => {
    // 캐시 안에서 우리가 수정하고 싶은 객체(type) 접근
    // fragment --> 수정하고자 하는 부분
    // data --> 어떻게?
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          rating
          isLiked
        }
      `,
      data: {
        // rating: 10, // remote available
        isLiked: !data.movie.isLiked, // local is also available
      },
    });
  };
  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Column>
        <Title>{`${data.movie.title}`}</Title>
        <Subtitle>⭐️ {data.movie.rating}</Subtitle>
        <LikeButton onClick={onClick}>
          {data.movie.isLiked ? "Like" : "UnLike"}
        </LikeButton>
        <Description>{data.movie.description_full}</Description>
      </Column>
      <Image bg={data.movie.medium_cover_image} />
    </Container>
  );
}
