// create a folder after the name of the page
// create a file named [id] which will be the template for all future pages

// import the function that allows to read the route's dynamic params
import { useParams } from "next/navigation";

// declare and export function for use elsewhere - default must be present
// it doesn't need paramaters
export default function Category() {
  // useParams allows to get the value of the current URL
  // brackets are mandatory to display the value of the id
  const { id } = useParams();

  // it returns the page with current id
  return `page catégorie ${id}`;
}
