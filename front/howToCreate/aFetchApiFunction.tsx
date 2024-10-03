import { useEffect, useState } from "react";

export default function MyFetchFunction() {
  // Creates a state initiated to null so that the useEffect will update it when page loads
  const [items, setItems] = useState(null);

  useEffect(() => {
    // when the page loads
    const fetchItems = async () => {
      // async function that will fetch the items...
      const response = await fetch("url_address"); // ... on an URL address (CORS must be enabled)
      const { items } = await response.json(); // data is fetched in json format in a variable
      setItems(items); // the items previously null are set to the data fetched
      console.log(items); // not mandatory, just to check if fetch is ok
    };

    // at this point, logic to fetch data is implemented and the function must be called
    fetchItems();
  }, []);

  return (
    <>
      <div>
        {/* items can be displayed in a front element */}
        {/* {items?.map((item: any) => (
          <div key={item.id}></div>
        ))} */}
      </div>
    </>
  );
}
