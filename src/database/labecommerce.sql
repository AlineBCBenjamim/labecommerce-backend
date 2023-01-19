-- Active: 1674140196318@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
);

SELECT * FROM users;

INSERT INTO users(id, email, password)
VALUES ("u001", "filipe@labenu.com", "filipe123"),
       ("u002", "barbara@labenu.com", "barbara123"),
       ("u003", "paulinha@labenu.com", "paulinha123");

CREATE TABLE products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO products(id, name, price, category)
VALUES ("p001", "Vestido", 50, "Roupas e calçados"),
       ("p002", "Blusa", 30, "Roupas e calçados"),
       ("p003", "Sapatinha", 80, "Roupas e calçados"),  
       ("p004", "Bota", 150, "Roupas e calçados"),
       ("p005", "Calça Jeans", 95, "Roupas e calçados");  

SELECT * FROM products;