import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent {
  public productFormGroup: FormGroup = new FormGroup({});
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
