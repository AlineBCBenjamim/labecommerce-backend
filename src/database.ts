import { TUser, TProduct, TPurchase, Category } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        name: "Alice Maria",
        email: "alicem@labenu.com",
        password: "a1b2c3d43",
        created_at: ""
    },  
    {
        id: "2",
        name: "Maria Eduarda",
        email: "mariae@labenu.com",
        password: "z12z254",
        created_at: ""       
    }
];

export const products: TProduct[] = [
    {
        id: "1",
        name: "Colar longo",
        price: 129.90,
        description: "Colar longo com chapinhas e pérolas",
        category: Category.ACESSORIES,
        image_url: "https://morana.vtexassets.com/arquivos/ids/179885-1200-auto?v=638054261726530000&width=1200&height=auto&aspect=true"
    },
    {
        id: "2",
        name: "Mule",
        price: 189.90,
        description: "Mule na cor conhaque",
        category: Category.CLOTHES_AND_SHOES,
        image_url: "https://dl1uwy1y5s83r.cloudfront.net/Custom/Content/Products/11/56/1156_mule-conhaque_z2_637370705415838943.jpg"
    }
];

export const purchases: TPurchase[] = [
    {
        id: "1",
        buyer: "1",
        total_price: 129.90,
        created_at: "",
        paid: 0 
    },
    {
      id: "2",
      buyer: "2",
      total_price: 189.90,
      created_at: "",
      paid: 0 
    }
];
  
  export function getAllUsers(users: TUser[]) : TUser[] {
    return users
  }
    
  export function getUserById(id: string) {
    const user = users.find((user) => user.id === id)
    return user
}

  export function getAllProducts(products: TProduct[]) : TProduct[] {
    return products
  }
  
  export function getProductById(idToSearch: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
      return product.id === idToSearch
    })
  }
  
  export function queryProductsByName (q: string) : TProduct[] {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase() === q
    })
  }
  
  export function getAllPurchasesFromUserId (id: string) : TPurchase[] | undefined {
    return purchases.filter((purchase) => {
        return purchase.id === id
    })

}