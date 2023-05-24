import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent {
  private sub$: Subscription | undefined;
  public editMode: boolean = false;
  public product!: Product;
  public productId!: string;

  public productFormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(0, [Validators.required, Validators.min(100)]),
    promotion: new FormControl(false),
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = route.snapshot.params['id'];
    if (this.productId != undefined) {
      this.editMode = true;
    } else this.editMode = false;
  }
  ngOnInit(): void {
    if (this.productId != undefined) {
      this.sub$ = this.productService
        .getOne(this.productId)
        .subscribe((data) => {
          this.product = data;
        });
    }
  }
  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
