import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import React from "react";

export default function PublishLpForm() {
  const createLp = () => {
    // to complete with /post-lp
  };
  return (
    <>
      <Form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          createLp();
        }}
      >
        <FormLabelWithField>
          Photo
          <TextField type="file" />
        </FormLabelWithField>
        <FormLabelWithField>
          Titre
          <TextField type="text" required minLength={4} />
        </FormLabelWithField>
        <FormLabelWithField>
          Prix
          <TextField type="number" required min={0} />
        </FormLabelWithField>
        <FormLabelWithField>
          Description
          <TextArea />
        </FormLabelWithField>
        <FormLabelWithField>
          Artiste
          <TextField type="email" required />
        </FormLabelWithField>
        <FormLabelWithField>
          Label
          <TextField type="text" />
        </FormLabelWithField>
        <PrimaryButton>Publier l'annonce</PrimaryButton>
      </Form>
    </>
  );
}
