import express, { raw, response } from "express"; // allows to use Express as the server - whta is the point of raw and response ??
require("dotenv").config(); // allows to use .env file and its related private data
import { Database } from "sqlite3"; // allows to use sqlite3 database to manage queries
import { DataSource } from "typeorm"; // allows to use DataSource object
import Lp, { TypeLp } from "./entities/Lp"; // imports a specific class

// defines a DataSource object in the context of the project to ensure connection to a specific database
const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite", // source of the database
  entities: [Lp], // lists the entities of the database
  synchronize: true, // useful in dev, dangerous in prod
});

const app = express(); // defines Express as the application server

const port = process.env.REACT_APP_SERVER_PORT; // gets the port defined in a secret variable in the .env file

const db = new Database("db.sqlite"); // defines a new sqlite database via its dedicated file

// used to check that the server is working
app.listen(port, async () => {
  await appDataSource.initialize(); // connects to database at the launch of the app
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
  const lps = await Lp.getAllLps(); // call of the item method (instead of having to write the SQL query SELECT...) which will call the model
  return res.json({ lps });
}); // adding or removing brackets change the data displayed, including the name of the variable as a data if present

// gets an item via its id
app.get("/lps/:id", (req, res) => {
  const id = req.params.id; // gets the URL parameter related to this item

  db.get("SELECT * FROM lp WHERE id = ?;", [id], (err, lp) => {
    // gets the specific lp via a prepared statement - returns the item or an error (err, lp)

    // if error
    if (err) {
      console.error(err.message); // displays error message
      return res.sendStatus(500); // code status Internal Server Error
    }

    if (lp) {
      return res.json({ lp }); // returns the item
    } else {
      return res.sendStatus(400); // item doesn't exist
    }
  });
});

// deletes an item via its id
app.delete("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item

  // deletes the chosen item via a prepared statement taking id as a parameter
  db.run("DELETE FROM lp WHERE id=?;", [id], function (err) {
    if (err) {
      console.error(err.message); // displays error message in console
      return res.sendStatus(500); // displays code status
    }
  });
  return res.status(204).json({ id }); // returns the deleted item
});

// creates a new item
app.post("/lps", async (req, res) => {
  const lpData = req.body; // gets the data sent by the client

  // enforces the non-nullable property of fields below
  if (!lpData.title) {
    return res.status(400).json({ error: "Title cannot be empty. " });
  }
  if (!lpData.artist) {
    return res.status(400).json({ error: "Artist cannot be empty. " });
  }

  const savedLp = await Lp.saveNewLp(lpData); // call of the item method (instead of having to write the SQL query INSERT INTO...) which will call the model

  return res.status(201).json({ lp: savedLp }); // returns the new json property (lp) which value is the newly savedLp object
});

// updates an item via its id
app.put("/lps/:id", (req, res) => {
  const id = parseInt(req.params.id); // gets the URL parameter related to this item

  db.get("SELECT * FROM lp WHERE id = ?;", [id], function (err, lp: TypeLp) {
    // gets the specific lp via a prepared statement - returns the item with its type defined above or an error (err, lp)

    // if error
    if (err) {
      console.error(err.message); // displays error message
      return res.sendStatus(500); // code status Internal Server Error
    } else if (!lp) {
      return res.sendStatus(400); // item doesn't exist
    } else {
      const rawData = req.body; // gets the new data sent by the client

      // enforces the non nullable property of following fields
      if (rawData.title === "") {
        res.status(400).json({ error: "Title must not be empty" });
      }
      if (rawData.artist === "") {
        res.status(400).json({ error: "Artist must not be empty" });
      }

      // The spread operator (...) allows us to accept a variable number of arguments and store them into an array
      // creates a new variable which will update the current item with each of the the new data received
      const updatedLp = {
        ...lp,
        title: rawData.title || lp.title,
        description: rawData.description ?? lp.description,
        artist: rawData.artist || lp.artist,
        release_year: rawData.release_year ?? lp.release_year,
        picture: rawData.picture ?? lp.picture,
        label: rawData.label ?? lp.label,
      };

      // pushes the new data to the database thanks to a prepared statement
      db.run(
        "UPDATE lp SET title=?, description=?, artist=?, release_year=?, picture=?, label=?) WHERE id=?;",
        [
          updatedLp.title,
          updatedLp.description,
          updatedLp.artist,
          updatedLp.release_year,
          updatedLp.picture,
          updatedLp.label,
        ], // updates the data sent by the client [ updatedLp.xxx, ...] via a prepared statement ("UPDATE ... ?)")

        // if error
        function (err) {
          if (err) {
            console.error(err.message); // displays error message
            return res.sendStatus(500); // code status Internal Server Error
          } else {
            return res.status(204).json({ lp: updatedLp }); // returns the updated item with status code, emphasizing the fact that the lp is now the updatedLp
          }
        }
      );
    }
  });
});
