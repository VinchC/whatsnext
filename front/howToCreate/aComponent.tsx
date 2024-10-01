// create a file named after the component for 
// import Component from the library
import Link from "next/link";

// declare and export function for use elsewhere - should precise default
// enumerate parameters and the type of each
// return the Component and its logic (content, CSS class, value etc.)
export default function functionName({ param1, param2 }: { param1: any; param2: any }) {
  return (
    <Link href="..." className="...">
      {param2}
    </Link>
  );
}
