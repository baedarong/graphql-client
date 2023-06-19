import { gql, useQuery } from "@apollo/client";
import React from "react";

const ALL_DATA = gql`
  query getData {
    allMovies {
      id
      title
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  const { data, error, loading } = useQuery(ALL_DATA);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>can not fetch data. the reason is {error} </h1>;
  return (
    <div>
      <h1>Movie List</h1>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
      <h1>Tweet List</h1>
      {data.allTweets.map((tweet) => (
        <li key={tweet.id}>
          {tweet.text} by {tweet.author.fullName}
        </li>
      ))}
    </div>
  );
}
