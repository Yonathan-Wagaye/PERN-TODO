CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT, 
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_passwords VARCHAR(255)
);

INSERT INTO todos(id, user_email, title, progress, date) VALUES ('0', 'yonathan@test.com', 'First Todo', 10, ';Wed Oct 2 2024 20:15:00 GMT+0400 (Gulf Standard Time)'); 