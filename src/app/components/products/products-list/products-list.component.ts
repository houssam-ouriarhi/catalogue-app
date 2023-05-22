import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  public sub$!: Subscription;
  public products!: Array<Product>;
  public isLoading: boolean = true;
  public currentAction: string = 'all';
  // Search form
  public searchFormGroup!: FormGroup;

  // Pagination
  public curentPage: number = 0;
  public pageSize: number = 5;
  public totalPages!: number;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null),
    });
    this.getPageProducts();
  }
  public getAll() {
    this.sub$ = this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.isLoading = false;
    });
  }
  public getPageProducts() {
    this.sub$ = this.productService
      .getPageProducts(this.curentPage, this.pageSize)
      .subscribe((data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
        this.curentPage = data.page;
        this.pageSize = data.size;
        this.isLoading = false;
      });
  }
  public handelPromotion(id: string) {
    this.productService.setPromotion(id);
  }
  handelDelete(id: string) {
    this.productService.delete(id);
    this.getPageProducts();
  }
  handelEdit(product: Product) {}
  handelSearchProducts() {
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword == '') {
      this.getPageProducts();
      return;
    }
    this.curentPage = 0;
    this.currentAction = 'search';
    this.sub$ = this.productService
      .search(keyword, this.curentPage, this.pageSize)
      .subscribe((data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
        this.curentPage = data.page;
        this.pageSize = data.size;
        this.isLoading = false;
      });
  }

  goToPage(page: number) {
    this.curentPage = page;
    this.currentAction == 'all'
      ? this.getPageProducts()
      : this.handelSearchProducts();
  }
  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
