import { useParams } from "next/navigation";

export default function Lp() {
  const id = useParams();

  return (
    <>
      <p>{`page lp ${id}`}</p>
      <a href="/">Home</a>
    </>
  );
}
