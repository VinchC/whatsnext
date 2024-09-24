CREATE TABLE lp (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  artist VARCHAR(150) NOT NULL,
  release_year INT,
  picture TEXT,
  label VARCHAR(150),
  createdAt INTEGER
);