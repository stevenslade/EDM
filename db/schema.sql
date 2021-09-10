DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  movie_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT,
  review TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE SET NULL
);