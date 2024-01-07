export interface ICategoryRequest {
    name: string;
    path: string;
    image: string;
}

export interface ICategoryResponse extends ICategoryRequest {
    id: number | string ;
}
