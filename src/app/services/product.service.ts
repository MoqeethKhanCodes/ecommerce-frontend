import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  
  

  //private baseUrl = "http://localhost:8080/api/products";
  private baseUrl = "http://localhost:8080/ecommerce/api/products";
  //private categoryUrl = "http://localhost:8080/api/product-category";
  private categoryUrl = "http://localhost:8080/ecommerce/api/product-category";

  constructor(private httpClient : HttpClient) { }

  getProduct(productId: string): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(categoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(myKeyword: string) {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${myKeyword}`;
    return this.getProducts(searchUrl);
    
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProduct>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).
    pipe(map(response => response._embedded.productCategories));
   
  }
}

interface GetResponseProduct{
  _embedded:{
    products : Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategories : ProductCategory[];
  }
}
