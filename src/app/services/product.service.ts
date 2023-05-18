import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Dell Computer', price: 5000, promotion: false },
      {
        id: UUID.UUID(),
        name: 'Lenovo Computer',
        price: 9500,
        promotion: true,
      },
      { id: UUID.UUID(), name: 'MSI Computer', price: 14900, promotion: false },
      { id: UUID.UUID(), name: 'HP Computer', price: 8600, promotion: false },
      { id: UUID.UUID(), name: 'ASUS Computer', price: 4500, promotion: true },
      { id: UUID.UUID(), name: 'HP printer', price: 6000, promotion: false },
      {
        id: UUID.UUID(),
        name: 'iPhone 14 Pro Max',
        price: 16000,
        promotion: true,
      },
      {
        id: UUID.UUID(),
        name: 'Samsung printer',
        price: 5390,
        promotion: false,
      },
      {
        id: UUID.UUID(),
        name: 'Samsung S22 Ultra',
        price: 5000,
        promotion: false,
      },
      { id: UUID.UUID(), name: 'Canon printer', price: 7800, promotion: true },
      { id: UUID.UUID(), name: 'OPPO', price: 4000, promotion: false },
    ];
  }

  public getAll(): Observable<Product[]> {
    return of(this.products);
  }

  // need to be verified and add redirection to not foun 404
  public getOne(id: string): Observable<Product> {
    let product = this.products.find((p) => p.id == id);
    if (product != undefined) return of(product);
    else return throwError(() => new Error('Product not found !!'));
  }
  //verifier this one also
  public addOne(product: Product): Observable<boolean> {
    this.products.push(product);
    return of(true);
  }

  public delete(id: string): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean> {
    // let product = this.getOne(id);
    let product = this.products.find((p) => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }
    return throwError(() => new Error('Product not found !!'));
  }
}
