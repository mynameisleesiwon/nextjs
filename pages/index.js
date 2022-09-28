import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (movieid, movietitle) => {
    router.push(`/movies/${movietitle}/${movieid}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img
            onClick={() => onClick(movie.id, movie.original_title)}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          <Link href={`/movies/${movie.original_title}/${movie.id}`}>
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
          color: black;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  // getServerSideProps : 이 이름은 바꿀 수 없다
  // 여기에 어떤 코드를 쓰던 그 코드는 server에서 돌아간다
  // client 쪽이 아니라 server(백엔드)쪽에서만 실행
  // API가 돌아오기전까지 화면에 아무것도 안 보임
  // API Key를 여기에 숨겨도 된다

  // 절대경로 사용
  let url = "http://localhost:3000/api/movies";
  let response = await fetch(url);
  let { results } = await response.json();
  return {
    props: {
      // results를 props로 return 해준다.
      results,
    },
  };
}
