import { ICategory } from "../category/category.interface";

export interface IProductRequest {
    category: ICategory;
    name: string;
    path: string,
    description: string;
    weight: number;
    price: number;
    image: string;
    count: number;
}

export interface IProductResponse extends IProductRequest{
    id:number;
}