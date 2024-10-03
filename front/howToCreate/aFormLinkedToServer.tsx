// First create the function that will include the form itself and the function that will send the data to the dedicated route
// Second create the function that will send the data
// Third after return create the form with event.preventDefault() and the function that send data
// Fourth create the button that will submit the form
// Last create the fields of the forms with their respective types

import { useState } from "react";

// first step
type PublishItemFormData = {
  // creates a type of data that will be expected for each field of the form
  field1: string;
  field2: number | null;
  field3: string;
};

// second step
export default function CreateDataForm() {
  const [formData, setFormData] = useState<PublishItemFormData>({
    // precises the type expected for this form, defined above
    // creates a state with empty or null fields when form page loads
    field1: "",
    field2: null,
    field3: "",
  });

  // third step
  const updateFormData = (partialFormData: Partial<PublishItemFormData>) => {
    // this function will update the formData with the content sent by the client for each field, hence the partialFormData - and its type
    setFormData({ ...formData, ...partialFormData });
  };

  // fourth step
  const createData = async () => {
    // creates an async function that will fetch the POST /items route and will send the data in json format
    await fetch("/api/items", {
      // fetches the route of items creation ...
      method: "POST", // with the method POST
      headers: { "Content type": "application.json" }, // defines the type of data that will be sent
      body: JSON.stringify(formData), // JSON is an object that provides function to convert JavaScript to and from JSON format
    });
  };

  return (
    <>
      {/* fifth step : create the form that will be triggered by the user and not automatically and submit the data */}
      <form
        className="..."
        onSubmit={(event) => {
          event.preventDefault();
          createData();
        }}
      >
        {/* sixth step : create the fields with respective types and onChange event that will trigger the updateFormData function (name of the field : event.targer.value) */}
        <area>
          Field 1
          <input
            type="text/file"
            className="..."
            onChange={(event) => {
              updateFormData({ field1: event.target.value });
            }}
          />
        </area>
        <area>
          Field 2
          <input
            type="number"
            className="..."
            onChange={(event) => {
              updateFormData({ field2: parseInt(event.target.value) });
            }}
          />
        </area>
        <area>
          Field 3
          <input
            type="email"
            className="..."
            onChange={(event) => {
              updateFormData({ field3: event.target.value });
            }}
          />
        </area>
        <button>Créer data</button>
      </form>
    </>
  );
}
