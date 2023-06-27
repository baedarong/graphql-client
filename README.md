## Apollo Client with ReactJS

**Introduction to Apollo Client**  
Apollo Client는 GraphQL을 사용하여 로컬 및 원격 데이터를 모두 관리할 수 있는 JavaScript용 상태 관리 라이브러리입니다. UI를 자동으로 업데이트하면서 애플리케이션 데이터를 가져오고, 캐시하고, 수정하는 데 사용합니다.  
https://www.apollographql.com/docs/react

특징 !

1. 데이터 fetching
2. 우수한 개발 경험 (TypeScript, devtools 등 유용한 도구 사용 가능)
3. 모던 React용으로 설계 (훅과 같은 최신 React 기능을 활용 가능)
4. 범용 호환 (모든 빌드 셋업 및 GraphQL API를 사용)

https://www.apollographql.com/docs/react/#features

**Localhost GraphQL 서버 실행**

ApolloClient 초기화

```
import { ApolloClient, InMemoryCache } from "@apollo/client";

// apllo client 생성 및 백엔드와 연동
// 실행되고 있는 graphQL server 를 갖고 있는게 중요함.
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

**useQuery & Variables**
useQuery 훅을 사용하여 React에서 GraphQL 데이터를 가져오고 그 결과를 UI에 연결할 수 있습니다. useQuery 훅은 Apollo 애플리케이션에서 쿼리를 실행하기 위한 기본 API입니다. 컴포넌트가 렌더링될 때 useQuery는 UI를 렌더링하는 데 사용할 수 있는 loading, error, data 속성이 포함된 Apollo Client의 객체를 반환합니다.

```
ex) const { loading, error, data } = useQuery(GET_DOGS);
```

https://www.apollographql.com/docs/react/data/queries#executing-a-query

useQuery API  
https://www.apollographql.com/docs/react/data/queries/#usequery-api

**Apollo Cache - Fetch**
Apollo Client 설정에서 `cache: new InMemoryCache()` 설정으로 인해 쿼리 결과가 브라우저의 메모리에 있는 캐시에 저장되기 때문에, 맨 처음 화면을 가져올 때만 data fetching이 작동하고 다른 화면으로 이동했다가 다시 돌아왔을 때 데이터를 다시 가져오지 않는다.
실시간 백엔드 데이터를 요청하고 싶을 때는 `fetchPolicy:'cache-and-network'`를 useQuery 객체에 포함시키면 된다.

```
const result = useQuery(SOMETHING, {
	fetchPolicy:'cache-and-network'
})
```

https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies

**Apollo Cache - Data normalization**
캐시는 객체가 포함된 각 필드를 가져와 해당 값을 적절한 객체에 대한 참조로 바꿉니다.
들어오는 오브젝트가 기존 캐시된 오브젝트와 동일한 캐시 ID를 가질 때마다 해당 오브젝트의 필드가 병합됩니다. 해당 캐시 ID는 Apollo가 자동 처리 합니다.

```
ex) profile->profile/detail 이동 시
같은 ID에 homeworld 객체만 더 추가된다면 cache에서 homeworld 객체만 병합된다.

{
	 "__typename": "Person",
	 "id": "cGVvcGxlOjE=",
	 "name": "Luke Skywalker",
	 "homeworld": {
		 "__typename": "Planet",
		 "id": "cGxhbmV0czox",
		 "name": "Tatooine"
	 }
 }
```

https://www.apollographql.com/docs/react/caching/overview/#data-normalization

**Apollo Client Devtools**

Apollo Client를 위한 GraphQL 디버깅 도구.
Apollo Client 개발자 도구는 오픈 소스 GraphQL 클라이언트인 Apollo Client를 위한 Chrome 확장 프로그램입니다.
이 확장 프로그램에는 4가지 주요 기능이 있습니다:

1. 앱의 네트워크 인터페이스를 직접 사용하여 GraphQL 서버에 대해 쿼리할 수 있는 Apollo Studio Explorer의 기본 제공 버전입니다(구성할 필요 없음).
2. 현재 페이지에서 감시 중인 쿼리, 해당 쿼리가 로드되는 시기 및 해당 쿼리가 사용하는 변수를 표시하는 쿼리 감시기.
3. 아폴로 클라이언트 애플리케이션 데이터에 적용된 변경 사항을 표시하는 변경 검사기.
4. Apollo 클라이언트 캐시 데이터를 표시하는 캐시 검사기. 트리형 인터페이스를 통해 캐시를 탐색하고 특정 필드 키 및 값을 검색할 수 있습니다.

https://github.com/apollographql/apollo-client-devtools
https://www.apollographql.com/docs/react/caching/overview/#visualizing-the-cache

**Local-only fields in Apollo Client**

Apollo 클라이언트 쿼리에는 GraphQL 서버의 스키마에 정의되지 않은 로컬 전용 필드가 포함될 수 있습니다. @client 지시문은 isLiked가 로컬 전용 필드임을 Apollo Client에 알립니다.  
isLiked는 로컬 전용이므로 Apollo Client는 데이터를 가져오기 위해 서버에 보내는 쿼리에서 이를 생략합니다. 최종 쿼리 결과는 모든 로컬 및 원격 필드가 채워진 후에 반환됩니다.

```
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
```

https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/

**writeFragment**

readFragment를 사용하여 Apollo 클라이언트 캐시에서 "random-access" 데이터를 읽는 것 외에도 writeFragment 메서드를 사용하여 캐시에 데이터를 쓸 수 있습니다.  
writeFragment를 사용하여 캐시된 데이터에 대한 변경 사항은 GraphQL 서버에 푸시되지 않습니다. 환경을 다시 로드하면 이러한 변경 사항이 사라집니다.
캐시 안에서 우리가 수정하고 싶은 객체(type) 접근(fragment부)하여 변경(data부)한다.

```
// 캐시 안에서 우리가 수정하고 싶은 객체(type) 접근(fragment부)하여 변경(data부)한다.
client.writeFragment({
	id: `Movie:${id}`,
	fragment: gql`
	fragment MyMovieFragment on Movie {
		rating
		isLiked
	}
	`,
	data: {
	// rating: 10, // remote available
	isLiked: !data.movie.isLiked, // local is also available
	},
});
```

https://www.apollographql.com/docs/react/caching/cache-interaction/#writefragment
