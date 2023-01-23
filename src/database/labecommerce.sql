-- Active: 1674308440844@@127.0.0.1@3306

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

-- Criação tabela de pedido 
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
-- verificar a tabela
SELECT * FROM purchases;

--Popular a Tabela
--Crie dois pedidos para cada usuário cadastrado 

INSERT INTO purchases(id, total_price, paid, buyer_id)
VALUES ("c001", 120, 0, "u002"),
       ("c002", 180, 0, "u002"), 
       ("c003", 200, 0, "u003"), 
       ("c004", 85, 0, "u003"), 
       ("c005", 200, 0, "u004"), 
       ("c006", 85, 0, "u004"); 

--Edite o status da data de entrega de um pedido 

UPDATE purchases
SET paid  = 1, delivered_at = DATETIME('now')
WHERE id = "c001";

-- Crie uma query de consulta com JOIN, junção da tabelas (users e purchases)
SELECT
users.id AS idUsers,
purchases.id AS idPurchases,
purchases.total_price AS totalPrice,
purchases.paid,
purchases.delivered_at AS deliveredAt
FROM purchases
JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "u003";

-- Tabela de relação

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM purchases_products;

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("c001", "p001", 2), ("c002", "p001", 4), ("c003", "p002", 3);

--Consulta com INNER JOIN de 3 tabelas

SELECT
    purchases.id,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    purchases.buyer_id,
    purchases_products.product_id AS productId,
    purchases_products.quantity,
    products.name,
    products.price,
    products.category
FROM purchases
    LEFT JOIN purchases_products ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;