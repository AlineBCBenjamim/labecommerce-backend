import { TUser, TProduct, TPurchase } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        email: "aluno@labenu.com",
        password: "aluno1234",
    },
    {
        id: "2",
        email: "aluno2@labenu.com",
        password: "aluno21234",
    }
];

export const products: TProduct[] = [
    {
        id: "1",
        name: "Harry Potter",
        price: 30,
        category: "livro",
    },
    {
        id: "2",
        name: "Corte de espinhos e rosas",
        price: 40,
        category: "livro",
    }
];

export const purchases: TPurchase[] =[
    {
        userId: "1",
        productId: "1",
        quantity: 2,
        totalPrice: 60,
    },
    {
        userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: 80,
    }
]