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
import { gql, useMutation } from "@apollo/client";
import {
  CreateLpFormMutation,
  CreateLpFormMutationVariables,
} from "@/gql/graphql";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CREATE_LP_FORM = gql`
  mutation CreateLpForm(
    $title: String!
    $description: String!
    $artist: String!
    $price: Float!
    $picture: String!
    $label: String!
    $categoryId: Int!
  ) {
    createLp(
      title: $title
      description: $description
      artist: $artist
      price: $price
      picture: $picture
      label: $label
      categoryId: $categoryId
    ) {
      id
    }
  }
`;


export default function PublishLpPage() {
  const [formData, setFormData] = useState<CreateLpFormMutationVariables>({
    title: "",
    description: "",
    artist: "",
    price: 0,
    picture: "",
    label: "",
    categoryId: 1,
  });

  const router = useRouter();

  const updateFormData = (
    partialFormData: Partial<CreateLpFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createLpMutation, { loading, error }] = useMutation<
    CreateLpFormMutation,
    CreateLpFormMutationVariables
  >(CREATE_LP_FORM);

  const createArticle = async () => {
    try {
      const { data } = await createLpMutation({
        variables: {
          title: formData.title,
          description: formData.description,
          artist: formData.artist,
          price: formData.price as number,
          picture: formData.title,
          label: formData.label,
          categoryId: formData.categoryId,
        },
      });

      if (data && data.createLp.id) {
        router.push(`/lps/${data.createLp.id}?publishConfirmation=true`);
      }
    } catch (error) {}
  };

  return (
    <>
      <PageContainer>
        <MainContentTitle>Publier un Lp</MainContentTitle>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            createArticle();
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
              minLength={2}
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
          <PrimaryButton disabled={loading}>
            {loading ? (
              <Loader size="SMALL" onBackground={true} />
            ) : (
              "Publier le Lp"
            )}
          </PrimaryButton>
          {error && error.message}
        </Form>
      </PageContainer>
    </>
  );
}
