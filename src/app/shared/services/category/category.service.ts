import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.BACKEND_URL; 
  private api = { category: `${this.url}/category`}

  constructor(
    private http: HttpClient
  ) { }

getAll(): Observable <ICategory[]> {
   return this.http.get<ICategory[]>(this.api.category)
}
getOne(id:number):Observable<ICategory[]> {
  return this.http.get<ICategory[]>(this.api.category);
}

create(category:ICategory): Observable<ICategory> {
  return this.http.post<ICategory>(this.api.category, category)
}

update(category:ICategory, id:number): Observable<ICategory> {
return this.http.patch<ICategory>(`${this.api.category}/${id}`, category)
}

delete(id:number): Observable<void> {
  return this.http.delete<void> (`${this.api.category}/${id}`)
}
}
