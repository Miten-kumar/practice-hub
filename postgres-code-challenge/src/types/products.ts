export interface Products {
    product_id:string;
    name:string;
    description:string;
    price:number;
    stock:number;
    created_at:Date;
}

export interface IProductsRepository {
    findById(product_id: string): Promise<Products | null>;
    create(product: Omit<Products, "product_id" | "created_at">): Promise<Products>;
    update(product_id: string, product: Partial<Omit<Products, "product_id" | "created_at">>): Promise<Products>;
    delete(product_id: string): Promise<void>;
}