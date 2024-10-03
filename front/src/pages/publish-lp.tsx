import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import React, { useState } from "react";

type PublishLpFormData = {
  picture: string;
  title: string;
  price: number | null;
  description: string;
  artist: string;
  label: string;
};

export default function PublishLpPage() {
  const [formData, setFormData] = useState<PublishLpFormData>({
    picture: "",
    title: "",
    price: null,
    description: "",
    artist: "",
    label: "",
  });

  const updateFormData = (partialFormData: Partial<PublishLpFormData>) => {
    return setFormData({ ...formData, ...partialFormData });
  };

  const createLp = async () => {
    await fetch("/api/lps/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          createLp();
        }}
      >
        <FormLabelWithField>
          Photo
          <TextField
            type="file"
            onChange={(event) => {
              updateFormData({ picture: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Titre
          <TextField
            type="text"
            required
            minLength={4}
            onChange={(event) => {
              updateFormData({ title: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Prix
          <TextField
            type="number"
            required
            min={0}
            onChange={(event) => {
              updateFormData({ price: parseInt(event.target.value) });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Description
          <TextArea
            onChange={(event) => {
              updateFormData({ description: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Artiste
          <TextField
            type="email"
            required
            onChange={(event) => {
              updateFormData({ artist: event.target.value });
            }}
          />
        </FormLabelWithField>
        <FormLabelWithField>
          Label
          <TextField
            type="text"
            onChange={(event) => {
              updateFormData({ label: event.target.value });
            }}
          />
        </FormLabelWithField>
        <PrimaryButton>Publier l'annonce</PrimaryButton>
      </Form>
    </>
  );
}
