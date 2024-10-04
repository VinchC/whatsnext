import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextArea,
  TextField,
} from "@/components/FormElements/Input/Input";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useRouter } from "next/router";
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

  const [submissionStatus, setSubmissionStatus] = useState<
    "IDLE" | "LOADING" | "ERROR" | "SUCCESS"
  >("IDLE");

  const router = useRouter();

  const updateFormData = (partialFormData: Partial<PublishLpFormData>) => {
    return setFormData({ ...formData, ...partialFormData });
  };

  const createLp = async () => {
    setSubmissionStatus("LOADING");
    const response = await fetch("/api/lps/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const { lp } = await response.json();

    if (response.ok && lp.id) {
      setSubmissionStatus("SUCCESS");
      router.push(`/lps/${lp.id}?publishConfirmation=true`);
    } else {
      setSubmissionStatus("ERROR");
    }
  };

  return (
    <>
        <PageContainer>
        <MainContentTitle>Publier un Lp</MainContentTitle>
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
        <PrimaryButton disabled={submissionStatus === "LOADING"}>
          {submissionStatus === "LOADING" ? (
            <Loader size="SMALL" onBackground={true} />
          ) : (
            "Publier le Lp"
          )}
        </PrimaryButton>
      </Form>
      </PageContainer>
    </>
  );
}
