import {
  users,
  products,
  purchases,
  queryProductsByName  
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TUser, TProduct, TPurchase, Category } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// GET all Users (todos os usuários)
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM users`)
    res.status(200).send({users: result});

  } catch (error: any) {
    console.log(error);   
    
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }

});


// GET all Products (todos os produtos)
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM products`)

    res.status(200).send({products: result});

  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
  
});

// GET ALL PURCHASES (todas as compras)
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM purchases;`);

    res.status(200).send(result);

  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// SEARCH Product by name (buscar produto por nome)
app.get("/products/search", async (req: Request, res: Response) => {
  try {    
  const q = req.query.q as string;
  const result: TProduct[] = queryProductsByName(q);

  if(q.length <= 1){
    res.status(400)
    throw new Error ("query params deve possuir pelo menos um caractere")
  }
  const product = await db.raw(`
  SELECT * FROM products
  WHERE name LIKE "%${q}%"`)

  res.status(200).send({product: result});

  } catch (error: any) {
    console.log(error);

    if(res.statusCode === 200){
      res. status(500)
    }
    res.send(error.message)
  }  
});

// POST Create User (Criação de um novo usuário)
app.post("/users", async (req: Request, res: Response) => {
try {
    const { id, name, email, password, created_at } = req.body;

    if (id !== undefined) {
      if (typeof id != "string") {
        res.status(400);
        throw new Error("'id' inválido, deve ser uma string!");
      }
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        res.status(400);
        throw new Error(
          "Este Id não está disponível para cadastro. Tente um novo Id."
        );
      }
    }
    
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Nome do user deve ser uma string");
      }
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'Id' ou 'Name' devem ter no minímo 1 caractere.");
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        res.status(400);
        throw new Error(
          "Este E-mail não está disponível para cadastro. Tente um novo E-mail."
        );
      }
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("Email do user deve ser uma string");
      }
    }

    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("Password do user deve ser uma string");
      }
    }

    const newUser = {
      id,
      name,
      email,
      password,
      created_at,
    };
    users.push(newUser);

    await db.raw(`
    INSERT INTO users (id, name, email, password) 
    VALUES ("${id}", "${name}", "${email}","${password}")`);

    res.status(201).send(`${name} cadastrado com sucesso!`);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

// POST Create Product (Criação de um novo produto)

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, category, image_url } = req.body;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id deve ser uma string");
      }
    }

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        res.status(400);
        throw new Error(
          "Este Id não está disponível para cadastro. Tente um novo Id."
        );
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Name deve ser uma string");
      }
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error(
        "'Id' ou 'Name' de produto deve ter no minímo 1 caractere."
      );
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("'Price' do produto deve ser um número");
      }
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        res.status(400);
        throw new Error("'Description' inválida, deve ser uma string");
      }
    }

    if (category !== undefined) {
      if (typeof category !== "string") {
        res.status(400);
        throw new Error("'Category' invalida, deve ser uma string");
      }
    }

    if (image_url !== undefined) {
      if (typeof image_url !== "string") {
        res.status(400);
        throw new Error("'Image_url' inválida, deve ser uma string");
      }
    }

    const newProduct = {
      id,
      name,
      price,
      description,
      category,
      image_url,
    };
    products.push(newProduct);

    await db.raw(`
    INSERT INTO products (id, name, price, description, category, image_url)
    VALUES ("${id}", "${name}", "${price}", "${description}", "${category}", "${image_url}");
    `);

    res.status(201).send(`${name} cadastrado com sucesso!`);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//POST Create Purchase (compra do produto e informação do usuário)

app.post("/purchases", async (req: Request, res: Response) => {
try {
    const { id, buyer, total_price, created_at, paid } = req.body as TPurchase;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("id deve ser uma string");
      }
    }

    const [findPurchaseId] = await db.raw(
      `SELECT * FROM purchases WHERE id="${id}"`
    );
    if (findPurchaseId) {
      res.status(400);
      throw new Error("Id de compra já cadastrado. Tenta novo Id de compra.");
    }

    if (buyer !== undefined) {
      if (typeof buyer !== "string") {
        res.status(400);
        throw new Error("Buyer deve ser uma string");
      }
    }

    const [findUserId] = await db.raw(
      `SELECT * FROM users WHERE id="${buyer}"`
    );
    if (!findUserId) {
      res.status(400);
      throw new Error("Não foi possivel achar o usuario pelo ID");
    }

    if (id.length < 1 || buyer.length < 1) {
      res.status(400);
      throw new Error(
        "As informações da compra devem ter no minímo 1 caractere."
      );
    }

    if (total_price !== undefined) {
      if (typeof total_price !== "number") {
        res.status(400);
        throw new Error("Preço total da compra deve ser um número");
      }
    }
    if (paid !== undefined) {
      if (typeof paid !== "number") {
        res.status(400);
        throw new Error("Status de pago deve ser um número");
      }
    }

    const newPurchase = {
      id,
      buyer,
      total_price,
      created_at,
      paid,
    };
    purchases.push(newPurchase);

    res.status(201).send("Compra realizada com sucesso!");

    await db.raw(`
    INSERT INTO purchases ( id, buyer, total_price, paid)
    VALUES ("${id}", "${buyer}", "${total_price}", "${paid}");
    `);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

// Get Products by id (procurar por id do produto)
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [product] = await db.raw(`
    SELECT * FROM products
    WHERE id = "${id}"
    `);

    if (!product) {
      res.status(400); // definimos um status code apropriado antes do disparo
      throw new Error("O produto não existe!");
    }

    res.status(200).send({ product: product });
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//Get User Purchases by User id (procurar compras por id)
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const buyer = req.params.id;

    const [userPurchase] = await db.raw(`
      SELECT * FROM purchases
      WHERE buyer = "${buyer}"
    `);

    if (!userPurchase) {
      res.status(400);
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send({ purchase: userPurchase });
    console.log("Array de compras do usuário:");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

// Delete User by id (apagar/deletar um usuário por id)

app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if(!findUser){
      res.status(400);
      throw new Error("Usuário não encontrado!")
    }

    const indexToRemove = users.findIndex((user) => user.id === id);

      if (indexToRemove >= 0) {
    
    users.splice(indexToRemove, 1);
  }

  res.status(200).send("User apagado com sucesso!");
  } catch (error:any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }
});

// Delete Product by id (apagar/deletar produto por id)

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id; 
    
    const findProduct = products.find((product) => product.id === id)
    if(!findProduct){
      res.status(400);
      throw new Error("Produto não encontrado!")
    }
  
  const indexToRemove = products.findIndex((product) => product.id === id);
  
  if (indexToRemove >= 0) {
    
    products.splice(indexToRemove, 1);
  }

  res.status(200).send("Produto apagado com sucesso!");
  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }   
});

//Edit User by id (Editar o usuário por id)

app.put("/user/:id", (req: Request, res: Response) => {
  try {

    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);

    if (!findUser){
      res.status(400)
      throw new Error("Usuáio não encontrado.")
    }

    const newId = req.body.id  
    const newEmail = req.body.email 
    const newPassword = req.body.password 

    const findEmail = users.find((user)=> user.email === newEmail)
    if (newEmail && findEmail){
      res.status(400);
      throw new Error("Este Email já existe. Tente novamente!")
    }

    const findNewId = users.find((user) => user.id === newId) 
    if (newId && findNewId){
      res.status(400);
      throw new Error("Este ID já existe. Tente novamente!")
    }
    
    if (newPassword && newPassword.length < 6){
      res.status(400);
      throw new Error("A senha deve possuir no mínimo 6 caracteres. Tente novamente!")
    }
        
      findUser.id = newId || findUser.id;
      findUser.email = newEmail || findUser.email;
      findUser.password = newPassword || findUser.password;      
    
    res.status(200).send("Atualização realizada com sucesso!");
    
  } catch (error:any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
    
  } 
});


//Edit Product by id (Editar produto por id)

app.put("/product/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;

  const findProduct = products.find((product) => product.id === id);

  if(!findProduct){
    res.status(400)
    throw new Error("Produto não encontrado!")
  }

  
  const newName = req.body.name 
  const newPrice = req.body.price 
  const newCategory = req.body.category 

  if(newName && newName.length < 3){
    res.status(400);
    throw new Error("O name deve possuir pelo menos 3 caracteres!");
  }

    if(typeof newPrice !== "number"){
    res.status(400);
    throw new Error("Novo preço deve ser um número.")
  }

  const product = products.find((product) => product.id === id);

  if (product) {    
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.category = newCategory || product.category;
  }

  res.status(200).send("Produto atualizado com sucesso!");

  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});



