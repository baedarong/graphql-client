import { ApolloClient, InMemoryCache } from "@apollo/client";

// apllo client 생성 및 백엔드와 연동
// 실행되고 있는 graphQL server 를 갖고 있는게 중요함.
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default client;
