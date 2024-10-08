import express from "express";
require("dotenv").config();
import { DataSource } from "typeorm";
import "reflect-metadata";

import Lp from "./entities/Lp";
import { isError } from "./utils";
import Category from "./entities/Category";
import Tag from "./entities/Tag";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { LpResolver } from "./resolvers/LpResolver";

const startApolloServer = async () => {
  // GraphQL schema is created at this step with all the Resolvers
  const schema = await buildSchema({ resolvers: [LpResolver] });

  // Apollo server is created at this step with the GraphQL schema
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();

const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Lp, Category, Tag],
  synchronize: true,
});

const app = express();

const port = process.env.REACT_APP_SERVER_PORT;

app.listen(port, async () => {
  await appDataSource.initialize();
  await Category.saveNewCategoryIfNotExisting({ title: "Rap US" });
  await Category.saveNewCategoryIfNotExisting({ title: "Rap FR" });
  await Category.saveNewCategoryIfNotExisting({ title: "Classique" });
  await Category.saveNewCategoryIfNotExisting({ title: "Jazz" });
  await Category.saveNewCategoryIfNotExisting({ title: "Blues" });
  await Category.saveNewCategoryIfNotExisting({ title: "Metal" });
  await Category.saveNewCategoryIfNotExisting({ title: "Soul" });
  await Category.saveNewCategoryIfNotExisting({ title: "Rock" });
  await Category.saveNewCategoryIfNotExisting({ title: "Electro" });
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("HELLO");
});

app.get("/lps", async (req, res) => {
  const { query } = req;
  const lps = await Lp.getAllLps(
    query.category ? parseInt(query.category as string) : undefined
  );
  return res.json({ lps });
});

app.get("/categories", async (req, res) => {
  const categories = await Category.getAllCategories();
  return res.status(200).json({ categories });
});

app.get("/tags", async (req, res) => {
  const tags = await Tag.getAllTags();
  return res.status(200).json({ tags });
});

app.get("/lps/:id", async (req, res) => {
  // the id being now from the string type, parseInt() must be removed for Tag and Lp
  const id = req.params.id;

  try {
    const lp = await Lp.getLpById(id);
    return res.json({ lp });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.get("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const category = await Category.getCategoryById(id);
    return res.status(200).json({ category });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.get("/tags/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const tag = await Tag.getTagById(id);
    return res.status(200).json({ tag });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.delete("/lps/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Lp.deleteLp(id);
    return res.status(204).json({ id });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.delete("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await Category.deleteCategory(id);
    return res.status(204).json({ id });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.delete("/tags/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Tag.deleteTag(id);
    return res.status(204).json({ id });
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.post("/lps", async (req, res) => {
  const lpData = req.body;

  try {
    const savedLp = await Lp.saveNewLp(lpData);
    return res.status(201).json({ lp: savedLp });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});

app.post("/categories", async (req, res) => {
  const categoryData = req.body;

  const savedCategory = await Category.saveNewCategoryIfNotExisting(
    categoryData
  );

  return res.status(201).json({ category: savedCategory });
});

app.post("/tags", async (req, res) => {
  const tagData = req.body;

  try {
    const savedTag = await Tag.saveNewTag(tagData);
    return res.status(201).json({ tag: savedTag });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});

app.put("/lps/:id", async (req, res) => {
  const id = req.params.id;

  const updatedData = req.body;

  try {
    const updatedLp = await Lp.updateLp(id, updatedData);
    return res.status(204).json({ lp: updatedLp });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});

app.put("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const updatedCategory = await Category.updateCategory(id, updatedData);
    return res.status(204).json({ category: updatedCategory });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});

app.put("/tags/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updatedTag = await Tag.updateTag(id, updatedData);
    return res.status(204).json({ tag: updatedTag });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});
