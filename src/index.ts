import express, { response } from "express";
require("dotenv").config();

import { lps } from "./lps";

const app = express();

const port = process.env.REACT_APP_SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/lps", (req, res) => {
  res.json({ lps }); // adding or removing brackets change the data displayed, including the name of the variable as a data if present
});

app.get("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to the item in particular
  const lp = lps.find((lp) => lp.id === id); // gets the item which id is the same as the one in the URL

  if (!lp) {
    // if item doesn't exist
    res.sendStatus(404);
  }

  res.json({ lp });
});

app.delete("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to the item in particular
  const lpIndex = lps.findIndex((lp) => lp.id === id); // gets the index of an item which is the same as the one in the URL

  if (lpIndex === -1) {
    // if item with this index doesn't exist
    res.sendStatus(404);
  }

  const lp = lps[lpIndex]; // gets the item which index corresponds to the params of the URL
  lps.splice(lpIndex, 1); // removes 1 item starting at the index corresponding to the params of the URL
  res.json({ lp }); // returns the deleted item
});

app.use(express.json()); //allows implementation of the post route

// route should always start with a "/"...
app.post("/lps", (req, res) => {
  const lp = req.body;

  lps.push(lp);
  res.status(201).json({ lp });
});
