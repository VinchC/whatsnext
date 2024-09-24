import express from "express";
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

app.use(express.json()); //allows implementation of the post route

// route should always start with a "/"...
app.post("/lps", (req, res) => {
  const lp = req.body;

  lps.push(lp);
  res.json({ lp });
});
