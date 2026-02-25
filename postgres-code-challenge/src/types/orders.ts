export interface Orders{
    order_id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    created_at: Date;
}

export interface IOrdersRepository {
    findById(order_id: string): Promise<Orders | null>;
    create(order: Omit<Orders, "order_id" | "created_at">): Promise<Orders>;
    update(order_id: string, order: Partial<Omit<Orders, "order_id" | "created_at">>): Promise<Orders>;
    delete(order_id: string): Promise<void>;
}