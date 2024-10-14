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

// step 1 : create the mutation for the schema
// this mutation replaces the former type PublishArticleFormData
// mutation will take as parameters the data expected by the form, and their types, to generate the schema
// il will then call the LpResolver mutation and link the data sent by user with the ones expected by the schema
// finally it will create en id for the new object
// it will then generate the new types and mutation to update the schema
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

// step 2 : update the GraphQL schema with npm run graphql-codegen

// step 3 : update the data type with GraphQL schema
export default function PublishLpPage() {
  // data type is now defined by the schema
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
    // data type is now defined by the schema
    partialFormData: Partial<CreateLpFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  // step 4 : create a function that will use the data types defined by the schema and take in parameter the mutation defined above
  const [createLpMutation, { loading, error }] = useMutation<
    CreateLpFormMutation,
    CreateLpFormMutationVariables
  >(CREATE_LP_FORM);

  // step 5 : create a function that will be used client-side to send the data to Apollo Server via GraphQL
  const createArticle = async () => {
    try {
      const { data } = await createLpMutation({
        // the "variables" is a mandatory part
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

      // if data exist and if an id has been returned, redirection
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
