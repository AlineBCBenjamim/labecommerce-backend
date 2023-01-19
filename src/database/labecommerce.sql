-- Active: 1674140196318@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
);

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


--Get all users (pegar todos usuarios)
SELECT * FROM users;

-- Get all Products (pegar todos produtos)
SELECT * FROM products;

--Search Product by name (selecione o produto por nome)
SELECT * FROM products
WHERE name LIKE "%Vestido%";

--Create User (Criar usuario)
INSERT INTO users(id, email, password)
VALUES ("u004","maria@labenu.com", "maria123");

--Create Product (criar produto)
INSERT INTO products(id, name, price, category)
VALUES ("p006","Luva", 70,"Roupas e calçados");

--Get Products by id (pegar produtos por id)
SELECT * FROM products
WHERE id = "p001"; 

--Delete User by id (apague um usuario por id)
DELETE FROM users
WHERE id = "u001";

--Delete Product by id (apague um produto por id)
DELETE FROM products
WHERE id = "p001";

INSERT INTO products(id, name, price, category) 
VALUES ("p001", "Vestido", 50, "Roupas e calçados");

--Edit User by id  (editar usuario para id)
UPDATE users
SET password = "Maria1234"
WHERE id = "u004";

--Edit Product by id (editar produto por id)
UPDATE products
SET price = 95
WHERE id = "p001";

--REFATORADO - Get All Users (pegar todos usuarios)
SELECT * FROM users ORDER BY email ASC;

--Get All Products versão 1 (pegar produtos)
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;

-- Get All Products versão 2 (pegar todos os produtos)
SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;
