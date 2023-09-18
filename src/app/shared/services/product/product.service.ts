import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../interfaces/category/category.interface';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL; 
  private api = { product: `${this.url}/product`}

  constructor(
    private http: HttpClient
  ) { }

getAll(): Observable <IProductResponse[]> {
   return this.http.get<IProductResponse[]>(this.api.product)
}
getOne(id:number):Observable<IProductResponse[]> {
  return this.http.get<IProductResponse[]>(this.api.product);
}

create(product:IProductRequest): Observable<IProductResponse> {
  return this.http.post<IProductResponse>(this.api.product, product)
}

update(product:IProductRequest, id:number): Observable<IProductResponse> {
return this.http.patch<IProductResponse>(`${this.api.product}/${id}`, product)
}

delete(id:number): Observable<void> {
  return this.http.delete<void> (`${this.api.product}/${id}`)
}
}