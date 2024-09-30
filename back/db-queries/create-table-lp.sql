CREATE TABLE IF NOT EXISTS lp (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  artist VARCHAR(150) NOT NULL,
  price INT,
  picture TEXT,
  label VARCHAR(150),
  createdAt INTEGER,
  categoryId INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES category(id)
);