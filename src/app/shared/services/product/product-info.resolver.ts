import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';
import { DocumentData } from "@firebase/firestore";
@Injectable({
  providedIn: 'root'
})

export class productInfoResolver implements Resolve<DocumentData> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> {
    return this.productService.getOneFirebase(route.paramMap.get('id') as string);
}
}
