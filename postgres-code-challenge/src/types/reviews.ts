export interface Reviews{
    review_id:string;
    user_id:string;
    product_id:string;
    rating:number;
    comment:string;
    created_at:Date;
}

export interface IReviewsRepository {
    findById(review_id: string): Promise<Reviews | null>;
    create(review: Omit<Reviews, "review_id" | "created_at">): Promise<Reviews>;
    update(review_id: string, review: Partial<Omit<Reviews, "review_id" | "created_at">>): Promise<Reviews>;
    delete(review_id: string): Promise<void>;
}