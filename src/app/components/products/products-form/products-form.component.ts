import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent {
  private sub$: Subscription | undefined;
  public errorMessage!: string;
  public editMode: boolean = false;
  public product!: Product;
  public productId!: string;

  public productFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.productFormGroup = new FormGroup({
      id: new FormControl(this.editMode ? this.product.id : ''),
      name: new FormControl(this.editMode ? this.product.name : '', [
        Validators.required,
        Validators.minLength(4),
      ]),
      price: new FormControl(this.editMode ? this.product.price : 0, [
        Validators.required,
        Validators.min(100),
      ]),
      promotion: new FormControl(
        this.editMode ? this.product.promotion : false
      ),
    });
  }
  handleAdding() {
    if (this.productFormGroup.valid) {
      let product: Product = this.productFormGroup.value;
      this.sub$ = this.productService.addOne(product).subscribe((data) => {
        this.router.navigateByUrl('/admin/products');
      });
    } else this.errorMessage = 'Fill the fields below.';
  }
  handelUpdate() {
    let product: Product = this.productFormGroup.value;
    this.sub$ = this.productService.update(product).subscribe((data) => {
      this.router.navigateByUrl('/admin/products');
    });
  }
  public getErrorMessage(field: string, errors: ValidationErrors): string {
    if (errors['required']) {
      return field + ' is Required';
    } else if (errors['minlength']) {
      return (
        field +
        ' is should have at least ' +
        errors['minlength']['requiredLength'] +
        ' character'
      );
    } else if (errors['min']) {
      return field + ' is should have on min ' + errors['min']['min'];
    } else return '';
  }
  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
