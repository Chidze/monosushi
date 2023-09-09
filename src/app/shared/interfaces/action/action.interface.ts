export interface IActionRequest {
    name: string;
    title: string;
    description: string;
    image: string;
}

export interface IActionResponse extends IActionRequest{
    id:number;
    data: Date;
}