import express from "express";
require('dotenv').config();

const app = express();

const port = process.env.REACT_APP_SERVER_PORT;

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
