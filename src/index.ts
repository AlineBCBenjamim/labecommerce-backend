import {
  users,
  products,
  purchases,
  queryProductsByName,
  CreateUser,
  CreateProduct,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TUser, TProduct, TPurchase, Category } from "./types";

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
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

// GET all Products (todos os produtos)
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

// GET ALL PURCHASES (todas as compras)
app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

// SEARCH Product by name (buscar produto por nome)
app.get("/products/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result: TProduct[] = queryProductsByName(q);

  res.status(200).send(result);
});

// POST Create User (Criação de um novo usuário)
app.post("/users", (req: Request, res: Response) => {
  const { id, email, password } = req.body as TUser;

  const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).send("Cadastro realizado com sucesso!");
});

// POST Create Product (Criação de um novo produto)

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, category } = req.body as TProduct;

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
});

//POST Create Purchase (compra do produto e informação do usuário)

app.post("/purchases", (req: Request, res: Response) => {
  const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };

  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso!");
});

// Get Products by id (procurar por id do produto)
app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const result = products.find((product) => product.id === id);

  res.status(200).send(result);
});

//Get User Purchases by User id (procurar compras por id)
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const id = req.params.id;

  const result = purchases.find((user) => user.userId === id);

  res.status(200).send(result);
});

// Delete User by id (apagar/deletar um usuário por id)

app.delete("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  // encontrar o índice do item a ser removido
  const indexToRemove = users.findIndex((user) => user.id === id);

  // só deletar caso o índice seja válido (ou seja, encontrou o item)
  if (indexToRemove >= 0) {
    // splice para editar diretamente o array accounts
    // primeiro arg é o índice alvo
    // segundo arg é quantos itens serão removidos a partir do alvo
    users.splice(indexToRemove, 1);
  }

  res.status(200).send("User apagado com sucesso!");
});

// Delete Product by id (apagar/deletar produto por id)

app.delete("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  // encontrar o índice do item a ser removido
  const indexToRemove = products.findIndex((product) => product.id === id);

  // só deletar caso o índice seja válido (ou seja, encontrou o item)
  if (indexToRemove >= 0) {
    // splice para editar diretamente o array accounts
    // primeiro arg é o índice alvo
    // segundo arg é quantos itens serão removidos a partir do alvo
    products.splice(indexToRemove, 1);
  }

  res.status(200).send("Produto apagado com sucesso!");
});

//Edit User by id (Editar o usuário por id)

app.put("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const user = users.find((user) => user.id === id);

  if (user) {
    user.id = newId || user.id;
    user.email = newEmail || user.email;
    user.password = newPassword || user.password;
  }

  res.status(200).send("Cadastro atualizado com sucesso!");
});

//Edit Product by id (Editar produto por id)

app.put("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as Category | undefined;

  const product = products.find((product) => product.id === id);

  if (product) {
    product.id = newId || product.id;
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.category = newCategory || product.category;
  }

  res.status(200).send("Produto atualizado com sucesso!");
});