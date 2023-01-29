-- Active: 1674308440844@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

INSERT INTO users (id, name, email, password) 
VALUES ("u001", "Filipe", "filipe@labenu.com", "filipe123"),
       ("u002", "Bárbara" ,"barbara@labenu.com", "barbara123"),
       ("u003", "Paula" ,"paulinha@labenu.com", "paulinha123");
SELECT * FROM users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        category,
        image_url
    )
VALUES ("p001", "Vestido", 999.00, "Vestido longo","Roupas e calçados", "https: / / static.zara.net / photos / / / 2023 / V / 0 / 1 / p / 2090 / 001 / 922 / 32 / w / 850 / 2090001922 _1_1_1.jpg ? ts = 1670410945115"),
       ("p002", "Camisa", 259.00, "Camisa Oversize de Popelina","Roupas e calçados", "https: / / static.zara.net / photos / / / 2023 / W / 0 / 1 / p / 5165 / 730 / 460 / 2 / w / 850 / 5165730460 _1_1_1.jpg ? ts = 1674475485447"),
       ("p003", "Sapatinha", 269.90, "Sapatilha Boneca em Verniz Preto","Roupas e calçados", "https: / / dl1uwy1y5s83r.cloudfront.net / Custom / Content / Products / 05 / 38 / 0538 _sapatilha - boneca - em - verniz - preto_z1_637258298567958406.jpg"),  
       ("p004", "Bota", 389.90, "Botinha Vintage Saltinho em Couro Café ","Roupas e calçados", "https: / / dl1uwy1y5s83r.cloudfront.net / Custom / Content / Products / 21 / 52 / 2152 _botinha - vintage - saltinho - em - couro - cafe_z1_637842345956189788.jpg"),
       ("p005", "Calça Jeans", 279.00, "Jeans Z1975 mid Rise Long Length", "Roupas e calçados", "https: / / static.zara.net / photos / / / 2023 / W / 0 / 1 / p / 6164 / 188 / 427 / 502 / w / 850 / 6164188427 _1_1_1.jpg ? ts = 1674041675654");  


--Get all users (pegar todos usuarios)
SELECT * FROM users;

-- Get all Products (pegar todos produtos)
SELECT * FROM products;

--Search Product by name (selecione o produto por nome)
SELECT * FROM products
WHERE name LIKE "%Vestido%";

--Create User (Criar usuario)
INSERT INTO users(id, name, email, password)
VALUES ("u004","Maria","maria@labenu.com", "maria123");

--Create Product (criar produto)
INSERT INTO
    products(
        id,
        name,
        price,
        description,
        category,
        image_url
    )
VALUES ("p006","Luva", 179.00, " Luvas de tule com brinhos","Roupas e calçados", "https: / / static.zara.net / photos / / / 2022 / I / 0 / 1 / p / 4548 / 261 / 800 / 2 / w / 850 / 4548261800 _1_1_1.jpg ? ts = 1666348704916");

--Get Products by id (pegar produtos por id)
SELECT * FROM products
WHERE id = "p001"; 

--Delete User by id (apague um usuario por id)
DELETE FROM users
WHERE id = "u001";

--Delete Product by id (apague um produto por id)
DELETE FROM products
WHERE id = "p001";

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
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL,
        paid INTEGER NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );
-- verificar a tabela
SELECT * FROM purchases;

--Popular a Tabela
--Crie dois pedidos para cada usuário cadastrado 
INSERT INTO purchases(id, buyer, total_price, paid) 
VALUES ("c001", "u002", 999.00, 0),
       ("c002","u002", 259.00, 1), 
       ("c003","u003", 269.90, 1), 
       ("c004", "u003", 279.00, 0), 
       ("c005", "u004", 389.90, 1), 
       ("c006", "u004", 259.00, 0); 

--Edite o status da data de entrega de um pedido 

UPDATE purchases
SET paid  = 1, created_at = DATETIME('now')
WHERE id = "c003";

-- Crie uma query de consulta com JOIN, junção da tabelas (users e purchases)
SELECT
users.id AS idUsers,
purchases.id AS idPurchases,
purchases.total_price AS totalPrice,
purchases.created_at AS createdAt, 
purchases.paid
FROM purchases
JOIN users ON purchases.buyer = users.id
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
VALUES ("c001", "p001", 1), ("c002", "p002", 1), ("c003", "p003", 1);

--Consulta com INNER JOIN de 3 tabelas

SELECT
    purchases.id,
    purchases.buyer,
    purchases.total_price,
    purchases.created_at,
    purchases.paid,
    purchases_products.product_id AS productId,
    purchases_products.quantity,
    products.name,
    products.price,
    products.description,
    products.category
FROM purchases
    LEFT JOIN purchases_products ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;