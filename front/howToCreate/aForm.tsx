// First create the function that will include the form itself and the function that will send the data to the dedicated route
// Second create the function that will send the data
// Third after return create the form with event.preventDefault() and the function that send data
// Fourth create the button that will submit the form
// Last create the fields of the forms with their respective types

export default function CreateDataForm() {
  const createData = () => {
    // send data to post/data route
  };
  return (
    <>
      <form
        className="..."
        onSubmit={(event) => {
          event.preventDefault();
          createData();
        }}
      >
        <area>
          Nom du champ
          <input type="text/number/email/file" className="..." />
        </area>
        <button>Créer data</button>
      </form>
    </>
  );
}
