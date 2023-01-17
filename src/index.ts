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
  try {
    res.status(200).send(users);

  } catch (error: any) {
    console.log(error);   
    
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }

});


// GET all Products (todos os produtos)
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500)
    }
    res.send(error.message)
  }
  
});

// GET ALL PURCHASES (todas as compras)
app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

// SEARCH Product by name (buscar produto por nome)
app.get("/products/search", (req: Request, res: Response) => {
  try {
  const q = req.query.q as string;
  const result: TProduct[] = queryProductsByName(q);

  if(q.length <= 1){
    res.status(400)
    throw new Error ("query params deve possuir pelo menos um caractere")
  }
  res.status(200).send(result);

  } catch (error: any) {
    console.log(error);

    if(res.statusCode === 200){
      res. status(500)
    }
    res.send(error.message)
  }  
});

// POST Create User (Criação de um novo usuário)
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body as TUser;

    const findId = users.find((user) => user.id === id);

    if(findId){
      res.status(400);
      throw new Error("Não é possível criar mais de uma conta com a mesma id.");
    }

    const findEmail = users.find((user) => user.email === email);

    if(findEmail){
      res.status(400);
      throw new Error("Não é possível criar mais de uma conta com o mesmo e-mail.");
    }

    const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }  
});

// POST Create Product (Criação de um novo produto)

app.post("/products", (req: Request, res: Response) => {
  try {
  const { id, name, price, category } = req.body as TProduct;

  const findId = products.find((product) => product.id === id);

    if(findId){
      res.status(400);
      throw new Error("Não é possível criar mais de um produto com a mesma id.");
    }

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error:any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }  
});

//POST Create Purchase (compra do produto e informação do usuário)

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const findIdUser = users.find((user) => user.id === userId);

    if(!findIdUser){
      res.status(400);
      throw new Error("Id do usuário que fez a compra deve existir no array de usuários cadastrados!");
    }

    const findProductId = products.find((product) => product.id === productId);

    if(!findProductId){
      res.status(400);
      throw new Error("Id do produto que foi comprado deve existir no array de produtos cadastrados!");
    }

    const findIdProduct = products.find((product) => product.id === productId);

    if(!findIdProduct){
      res.status(400);
      throw new Error("Id do produto que foi comprado deve existir no array de produtos cadastrados!");
    }

    if(findIdProduct.price * quantity !== totalPrice){
      res.status(400)
      throw new Error("A quantidade e o total da compra devem estar com o cálculo correto.")
    }

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };

  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso!");
  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }  
});

// Get Products by id (procurar por id do produto)
app.get("/products/:id", (req: Request, res: Response) => {
  try {
  const id = req.params.id;
  const result = products.find((product) => product.id === id);

  if(!result){
    res.status(400);
    throw new Error("O produto não existe!")
  }
  res.status(200).send(result);

  } catch (error: any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
  }
  
});

//Get User Purchases by User id (procurar compras por id)
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
  const id = req.params.id;

  const result = purchases.find((user) => user.userId === id);

  if(!result){
    res.status(400);
    throw new Error("Usuário não encontrado!");
  }

  res.status(200).send(result);
  console.log("Array de comparas do usuário:");  

  } catch (error:any) {
    console.log(error);
    
    if(res.statusCode === 200){
      res.status(500);
    }
    res.send(error.message)
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



