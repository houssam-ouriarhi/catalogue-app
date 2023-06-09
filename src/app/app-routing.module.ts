import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { LoginComponent } from './components/login/login.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ProductsFormComponent } from './components/products/products-form/products-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'add',
        component: ProductsFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProductsFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
