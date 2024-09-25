-- get items with categoryId
SELECT * FROM lp WHERE categoryId=1;

-- get items with category name
SELECT * FROM lp JOIN category ON lp.categoryId=category.id WHERE category.name = "East Coast";

-- get items from multiple categories with id
SELECT * FROM lp WHERE categoryId IN (1, 2);

-- get items from multiple categories with category names
SELECT * FROM lp JOIN category ON lp.categoryId=category.id WHERE category.name = "East Coast" OR category.name = "West Coast";