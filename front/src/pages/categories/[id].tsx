import { useParams } from "next/navigation";

export default function Category() {
  const id = useParams();

  return (
    <>
      <p>{`page catégorie ${id}`}</p>
      <a href="/">Home</a>
    </>
  );
}
