import PrimaryButton from "@/components/PrimaryButton";

export default function PublishLpForm() {
  const createLp = () => {
    // to complete with /post-lp
  };
  return (
    <>
      <main className="main-content">
        {/* to benefit from the CSS */}
        <form
          className="form" // every html tag should have a className
          onSubmit={(event) => {
            event.preventDefault(); // the event must be explicitely handled
            createLp(); // function that is triggered by the user's action
          }}
        >
          <label className="form-label-with-field">
            Photo {/* label allows to give the field a title*/}
            <input className="text-field" type="file" />{" "}
            {/* type defines the data sent (text, number, file, email etc. */}
          </label>
          <label className="form-label-with-field">
            Titre
            <input className="text-field" type="text" required minLength={4} />
          </label>
          <label className="form-label-with-field">
            Prix
            <input className="text-field" type="number" required min={0} />
          </label>
          <label className="form-label-with-field">
            Description
            <textarea className="text-field" text-area />{" "}
            {/* textarea represents a multi-line plain-text editing control */}
          </label>
          <label className="form-label-with-field">
            Artiste
            <input className="text-field" type="email" required />
          </label>
          <PrimaryButton>Créer un lp</PrimaryButton>
        </form>
      </main>
    </>
  );
}
