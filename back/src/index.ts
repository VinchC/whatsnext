require("dotenv").config();
import { DataSource } from "typeorm";
import "reflect-metadata";

import Lp from "./entities/Lp";
import Category from "./entities/Category";
import Tag from "./entities/Tag";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { LpResolver } from "./resolvers/LpResolver";
import { TagResolver } from "./resolvers/TagResolver";

// definition of the datasource 
const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Lp, Category, Tag],
  synchronize: true,
});

// definition of the port server
const PORT = 4000;

// creation of Apollo Server
const startApolloServer = async () => {
  // creation of the GraphQL schema that will use Resolvers and class-validator
  const schema = await buildSchema({
    resolvers: [LpResolver, TagResolver],
    validate: true,
  });

  // creation of the server that will use theschema
  const server = new ApolloServer({ schema });

  // creation of the url that the server will use
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  // datasource initialization
  await appDataSource.initialize();

  // list of categories created when datasource is initialized
  await Category.saveNewCategoryIfNotExisting({ id: 1, title: "Rap US" });
  await Category.saveNewCategoryIfNotExisting({ id: 2, title: "Rap FR" });
  await Category.saveNewCategoryIfNotExisting({ id: 3, title: "Classique" });
  await Category.saveNewCategoryIfNotExisting({ id: 4, title: "Jazz" });
  await Category.saveNewCategoryIfNotExisting({ id: 5, title: "Blues" });
  await Category.saveNewCategoryIfNotExisting({ id: 6, title: "Metal" });
  await Category.saveNewCategoryIfNotExisting({ id: 7, title: "Soul" });
  await Category.saveNewCategoryIfNotExisting({ id: 8, title: "Rock" });
  await Category.saveNewCategoryIfNotExisting({ id: 9, title: "Electro" });

  console.log(`🚀  Server ready at: ${url}`);
};

// Apollo Server initialization
startApolloServer();
