## Apollo Client with ReactJS

**Apollo Client**  
Apollo Client는 GraphQL을 사용하여 로컬 및 원격 데이터를 모두 관리할 수 있는 JavaScript용 상태 관리 라이브러리입니다. UI를 자동으로 업데이트하면서 애플리케이션 데이터를 가져오고, 캐시하고, 수정하는 데 사용합니다.  
https://www.apollographql.com/docs/react

특징 !

1. 데이터 fetching
2. 우수한 개발 경험 (TypeScript, devtools 등 유용한 도구 사용 가능)
3. 모던 React용으로 설계 (훅과 같은 최신 React 기능을 활용 가능)
4. 범용 호환 (모든 빌드 셋업 및 GraphQL API를 사용)

https://www.apollographql.com/docs/react/#features

**GraphQL Server Connect**

ApolloClient 초기화

```
import { ApolloClient, InMemoryCache } from "@apollo/client";

// apllo client 생성 및 백엔드와 연동
// 실행중인 graphQL server를 가지고 있어야함.
const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});
```

https://www.apollographql.com/docs/react/get-started#2-initialize-apolloclient

**ApolloProvider**  
provider는 기본적으로 앱 안의 모든 리액트가 client에 접근할 수 있도록 한다.

```
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ApolloProvider  client={client}>
			<App  />
		</ApolloProvider>
	</React.StrictMode>
);
```

**useApolloClient**

```
import { useApolloClient } from '@apollo/client';

function Component() {
	// 애플리케이션에서 사용 중인 ApolloClient 인스턴스
	const client = useApolloClient();

	// 일반적인 react useEffect hook 이용시 아래와 같이 사용
	useEffect(() => {
		client.query({
			query: gql` {
				allMovies { id title year summary }
			}`, })
		 .then((result) => setMovies(result.data.allMovies)); },
  [client]);
}
```

https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient

**useQuery**
useQuery 훅을 사용하여 React에서 GraphQL 데이터를 가져오고 그 결과를 UI에 연결할 수 있습니다. useQuery 훅은 Apollo 애플리케이션에서 쿼리를 실행하기 위한 기본 API입니다. 컴포넌트가 렌더링될 때 useQuery는 UI를 렌더링하는 데 사용할 수 있는 loading, error, data 속성이 포함된 Apollo Client의 객체를 반환합니다.

```
const ALL_DATA = gql`
  query getData {
    allMovies {
      id
      title
    }
  }
`;

const { loading, error, data } = useQuery(ALL_DATA);
```

https://www.apollographql.com/docs/react/data/queries#executing-a-query

useQuery API  
https://www.apollographql.com/docs/react/data/queries/#usequery-api
