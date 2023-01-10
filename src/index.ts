import { users, products, purchases, queryProductsByName, CreateUser, CreateProduct} from "./database";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import { TUser, TProduct, TPurchase, Category} from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// GET all Users (todos os usuários)
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

// GET all Products (todos os produtos)
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

// GET ALL PURCHASES (todas as compras)
app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

// SEARCH Product by name (buscar produto por nome)
app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = queryProductsByName(q)

    res.status(200).send(result)
})

// POST Create User (Criação de um novo usuário)
app.post("/users", (req: Request, res: Response) => {
    const {id, email, password} = req.body as TUser

    const newUser: TUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

// POST Create Product (Criação de um novo produto)

app.post("/products", (req: Request, res: Response) => {
    const {id, name, price, category} = req.body as TProduct

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})

//POST Create Purchase (compra do produto e informação do usuário)

app.post("/purchases", (req: Request, res: Response) => {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
})