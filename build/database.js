"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
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
exports.purchases = [
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
];
//# sourceMappingURL=database.js.map