import express, { raw, response } from "express"; // allows to use Express as the server - whta is the point of raw and response ??
require("dotenv").config(); // allows to use .env file and its related private data
import { Database } from "sqlite3"; // allows to use sqlite3 database to manage queries

import { lps } from "./lps"; // import data from another file

const app = express(); // defines Express as the application server

const port = process.env.REACT_APP_SERVER_PORT; // gets the port defined in a secret variable in the .env file

const db = new Database("db.sqlite"); // defines a new sqlite database via its dedicated file

// used to check that the server is working
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json()); //allows implementation of the post route

// a route should always start with a "/"...

// access to home page
app.get("/", (req, res) => {
  res.send("HELLO"); // the send function displays text on the page
});

// gets all items
app.get("/lps", (req, res) => {
  db.all("SELECT * FROM lp;", (err, lps) => {
    // get all items from database instead of importing them from a dedidated file
    res.json({ lps });
  }); // adding or removing brackets change the data displayed, including the name of the variable as a data if present
});

// gets an item via its id
app.get("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item
  const lp = lps.find((lp) => lp.id === id); // gets the item which id is the same as the one in the URL

  // if item doesn't exist
  if (!lp) {
    res.sendStatus(404); // returns status code "Not found"
  }

  res.json({ lp });
});

// deletes an item via its id
app.delete("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item
  const lpIndex = lps.findIndex((lp) => lp.id === id); // gets the index of an item which is the same as the parameter in the URL

  // if item with this index doesn't exist
  if (lpIndex === -1) {
    res.sendStatus(404); // returns status code "Not found"
  }

  const lp = lps[lpIndex]; // gets the item which index corresponds to the parameter of the URL
  lps.splice(lpIndex, 1); // removes 1 item starting at the index corresponding to the params of the URL
  res.json({ lp }); // returns the deleted item
});

// creates a new item
app.post("/lps", (req, res) => {
  const lp = req.body; // gets the data sent by the client

  lps.push(lp); // pushes the new data to this array

  res.status(201).json({ lp }); // returns the item with status code
});

// updates an item via its id
app.put("/lps/:id", (req, res) => {
  const _id = parseInt(req.params.id); // gets the URL parameter related to this item - _id prevents the field id to be updated by the user
  const lpIndex = lps.findIndex((lp) => lp.id === _id); // gets the index of an item which is the same as the parameter in the URL

  // if item with this index doesn't exist
  if (lpIndex === -1) {
    res.sendStatus(404); // returns status code "Not found"
  }

  const lp = lps[lpIndex]; // gets the item which index corresponds to the parameter of the URL
  const rawData = req.body; // gets the new data sent by the client (including the current id of the item)

  const { id, ...newData } = rawData; // separates the id which is not updatable from the new data updated by the client

  // The spread operator (...) allows us to accept a variable number of arguments and store them in an array
  const updatedLp = {
    ...lp,
    title: rawData.title || lp.title,
    description: rawData.description ?? lp.description,
    artist: rawData.artist || lp.artist,
    release_year: rawData.release_year ?? lp.release_year,
    picture: rawData.picture ?? lp.picture,
    label: rawData.label ?? lp.label,
    createdAt: rawData.createdAt ?? lp.createdAt,
  }; // updates the former data with the new ones (some fields are mandatory || some fields can be emptied)

  lps.splice(lpIndex, 1, updatedLp); // deletes the item at current index and replaces it with the updatedData

  res.status(204).json({ lp: updatedLp }); // returns the updated item with status code, linking the item via its id to the updated data
});
