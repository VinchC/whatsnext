// create a folder after the name of the page => categories/[id]
// create a file named [id] which will be the template for all future pages

// import the function that allows to read the route's dynamic params
import { useParams } from "next/navigation";

// declare and export function for use elsewhere - default must be present
// it doesn't need paramaters
export default function Category() {
  // since `useParams` returns `null` on the server, to avoid a bug with rendering server-side, 2 steps are to be followed :
  // useParams allows to get the value of the current URL
  // id is the value got but the ? avoids the bug
  const params = useParams();
  const id = params?.id;

  // it returns the page with current id or loading depending on the case
  // and a link to the homepage for convenience
  return (
    <>
      <p>{id ? `page catégorie ${id}` : "Loading..."}</p>
      <a href="/">Home</a>
    </>
  );
}
