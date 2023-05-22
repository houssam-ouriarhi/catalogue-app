import { PageProduct, Product } from '../models/product.model';
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
  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    /**
     * Exemple: if we have a 50 products on the list
     * and we want just 5 products in the pages
     *  totalPage is 50/5 = 10
     * se there is 10 pages
     */
    let totalPages = ~~(this.products.length / size);
    let index = page * size;
    if (this.products.length % size != 0) totalPages++;
    let pageProducts = this.products.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    });
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
  public search(
    keyword: string,
    page: number,
    size: number
  ): Observable<PageProduct> {
    let result = this.products.filter((p) => p.name.includes(keyword));

    let totalPages = ~~(result.length / size);
    let index = page * size;
    if (result.length % size != 0) totalPages++;

    let pageProducts = result.slice(index, index + size);
    let pageProduct: PageProduct = {
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    };
    return of(pageProduct);
  }
}
