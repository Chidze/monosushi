import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionRequest, IActionResponse } from '../../interfaces/action/action.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData
} from "@angular/fire/firestore";
import { DocumentData, collection } from "@firebase/firestore"
import {ICategoryRequest} from "../../interfaces/category/category.interface";
@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private url = environment.BACKEND_URL;
  private api = { action: `${this.url}/action`}
  private actionCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore,
) {
  this.actionCollection = collection(this.afs, 'actions');
}

getAll(): Observable <IActionResponse[]> {
   return this.http.get<IActionResponse[]>(this.api.action)
}
getOne(id: number): Observable<IActionResponse> {
  return this.http.get<IActionResponse>(`${this.api.action}/${id}`);;
}

create(action:IActionRequest): Observable<IActionResponse> {
  return this.http.post<IActionResponse>(this.api.action, action)
}

update(action:IActionRequest, id:number): Observable<IActionResponse> {
return this.http.patch<IActionResponse>(`${this.api.action}/${id}`,action)
}

delete(id:number): Observable<void> {
  return this.http.delete<void> (`${this.api.action}/${id}`)
}
// -------------------------------------------------------------------


  getAllFirebase() {
    return collectionData(this.actionCollection, {idField: 'id'});
  }
  getOneFirebase(id: string) {
    const actionDocumentReference = doc(this.afs, `actions/${id}`);
    return docData(actionDocumentReference, {idField: 'id'});
  }

  createFirebase(action: ICategoryRequest) {
    return addDoc(this.actionCollection, action);
  }

  updateFirebase(action: IActionRequest, id: string) {
    const actionDocumentReference = doc(this.afs, `actions/${id}`);
    return updateDoc(actionDocumentReference, {...action});
  }

  deleteFirebase(id: string) {
    const actionDocumentReference = doc(this.afs, `actions/${id}`);
    return deleteDoc(actionDocumentReference);
  }
}
