DROP DATABASE IF EXISTS item_informationDB;

CREATE DATABASE item_informationDB;

USE item_informationDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  category VARCHAR(45) NULL,
  bidAmount INT NULL,  
  PRIMARY KEY (id)
);

INSERT INTO items (item, category, bidAmount)
VALUES ("purse", "accesoory", 50);

INSERT INTO items (item, category, bidAmount)
VALUES ("chair", "furniture", 500);

INSERT INTO items (item, category, bidAmount)
VALUES ("TV", "appliances", 600);

INSERT INTO items (item, category, bidAmount)
VALUES ("rack", "furniture", 60);

INSERT INTO items (item, category, bidAmount)
VALUES ("car", "property", 60000);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
