import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  public sub$!: Subscription;
  public products!: Array<Product>;
  public isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub$ = this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.isLoading = false;
    });
  }
  public handelPromotion(id: string) {
    this.productService.setPromotion(id);
  }
  handelDelete(id: string) {
    this.productService.delete(id);
  }
  handelEdit(id: string) {}
}
