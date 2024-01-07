import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData, where, query, getDocs
} from "@angular/fire/firestore";
import { DocumentData, collection } from "@firebase/firestore"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { product: `${this.url}/product`}
  private productCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
  private afs: Firestore,
) {
  this.productCollection = collection(this.afs, 'products');
}

getAll(): Observable <IProductResponse[]> {
   return this.http.get<IProductResponse[]>(this.api.product)
}
getAllByCategory(name: string): Observable<IProductResponse[]> {
 return this.http.get<IProductResponse[]>(`${this.api.product}?category.path=${name}`);
}
getOne(id: number): Observable<IProductResponse> {
  return this.http.get<IProductResponse>(`${this.api.product}/${id}`);
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
// -------------------------------------------------------------------


  getAllFirebase() {
    return collectionData(this.productCollection, {idField: 'id'});
  }
  // getAllByCategoryFirebase(name: string)  {
  //   const productsQuery= query(this.productCollection, where('category.path', '==', name));
  //   return collectionData(productsQuery, {idField: 'name'})
  // }
  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'products'),
      where('category.path', '==', `${name}`)
    );
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, {idField: 'id'});
  }

  createFirebase(product: IProductResponse) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductResponse, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
