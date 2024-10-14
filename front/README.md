## Create Next project

- https://github.com/vercel/next.js/tree/canary/packages/create-next-app
- node --version to check if node is installed and its current version
- npx create-next-app@latest with default options

## Manage CSS

Install styled.components

- npm i styled-components

## Connect front to back

- enable CORS in the next.config.mjs file (reactStrictMode: true, async rewrites, return source and destination)
- create a useEffect in the concerned pages to fetch the data on the server

## Create Apollo Client and install GraphQL

npm i graphql => install GraphQL

npm i @apollo/client => install Apollo Server

- modify the _app file with { ApolloProvider } and createApolloClient()

npm i @graphql-codegen/cli => generates code from your GraphQL schema and GraphQL operations with a single function call regardless of your environment or code format

create script "graphql-codegen": "graphql-codegen --config graphql-codegen.ts"

npm i -D @graphql-codegen/client-preset => client-preset provides typed GraphQL operations (Query, Mutation and Subscription) by perfectly integrating with your favorite GraphQL clients (with Apollo Client in this project's case)


                  ----------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
