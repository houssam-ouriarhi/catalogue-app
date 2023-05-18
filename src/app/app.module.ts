import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProductsListComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
