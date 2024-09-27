import express, { raw, response } from "express"; // allows to use Express as the server - whta is the point of raw and response ??
require("dotenv").config(); // allows to use .env file and its related private data
import { Database } from "sqlite3"; // allows to use sqlite3 database to manage queries
import { DataSource } from "typeorm"; // allows to use DataSource object
import Lp from "./entities/Lp"; // imports a specific class
import Category from "./entities/Category"; // imports a specific class
import { isError } from "./utils";

// defines a DataSource object in the context of the project to ensure connection to a specific database
const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite", // source of the database
  entities: [Lp, Category], // lists the entities of the database
  synchronize: true, // useful in dev, dangerous in prod
});

const app = express(); // defines Express as the application server

const port = process.env.REACT_APP_SERVER_PORT; // gets the port defined in a secret variable in the .env file

const db = new Database("db.sqlite"); // defines a new sqlite database via its dedicated file

// used to check that the server is working
app.listen(port, async () => {
  await appDataSource.initialize(); // connects to database at the launch of the app
  await Category.saveNewCategory({ title: "East Coast" });
  await Category.saveNewCategory({ title: "West Coast" });
  await Category.saveNewCategory({ title: "Classical" });
  await Category.saveNewCategory({ title: "Jazz" });
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json()); //allows implementation of the post route

// a route should always start with a "/"...

// access to home page
app.get("/", (req, res) => {
  return res.send("HELLO"); // the send function displays text on the page
});

// gets all items
app.get("/lps", async (req, res) => {
  const lps = await Lp.getAllLps(); // call of the entity method (instead of having to write the SQL query SELECT...) which will call the model
  return res.json({ lps });
}); // adding or removing brackets change the data displayed, including the name of the variable as a data if present

app.get("/categories", async (req, res) => {
  const categories = await Category.getAllCategories();
  return res.status(200).json({ categories });
});

// gets an item via its id
app.get("/lps/:id", async (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item

  try {
    const lp = await Lp.getLpById(id); // call of the entity method (instead of having to write the SQL query SELECT... WHERE...) which will call the model
    return res.json({ lp }); // returns the chosen item
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

// deletes an item via its id
app.delete("/lps/:id", async (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item

  try {
    await Lp.deleteLp(id); // call of the entity method (instead of having to write the SQL query DELETE...) which will call the model
    return res.status(204).json({ id }); // returns the deleted item
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

// creates a new item
app.post("/lps", async (req, res) => {
  const lpData = req.body; // gets the data sent by the client

  const savedLp = await Lp.saveNewLp(lpData); // call of the entity method (instead of having to write the SQL query INSERT INTO...) which will call the model

  return res.status(201).json({ lp: savedLp }); // returns the new json property (lp) which value is the newly savedLp object
});

app.post("/categories", async (req, res) => {
  const categoryData = req.body;

  const savedCategory = await Category.saveNewCategory(categoryData);

  return res.status(201).json({ category: savedCategory });
});

// updates an item via its id
app.put("/lps/:id", async (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item

  const lpData = req.body; // gets the data sent by the client

  // enforces the non-nullable property of fields below
  // if (!lpData.title) {
  //   return res.status(400).json({ error: "Title cannot be empty. " });
  // }
  // if (!lpData.artist) {
  //   return res.status(400).json({ error: "Artist cannot be empty. " });
  // }

  try {
    const updatedLp = await Lp.updateLp(id, lpData); // call of the entity method (instead of having to write the SQL query UPDATE...) which will call the model
    return res.status(204).json({ lp: updatedLp }); // returns the updated item
  } catch (error) {
    if (isError(error)) {
      return res.status(404).json({ error: error.message });
    }
  }
});

app.put("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  // if (!updatedData.title) {
  //   return res.status(400).json({ error: "Title cannot be empty. " });
  // }

  try {
    const updatedCategory = await Category.updateCategory(id, updatedData);
    return res.status(204).json({ category: updatedCategory });
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json({ error: error.message });
    }
  }
});
