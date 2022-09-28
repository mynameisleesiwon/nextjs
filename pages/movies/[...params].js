import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function MovieDetail({ params }) {
  const router = useRouter();
  console.log("router", router);
  const [movietitle, movieid] = params || [];
  return (
    <div>
      <Seo title={movietitle} />
      <h4>{movietitle || "Loading..."}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
