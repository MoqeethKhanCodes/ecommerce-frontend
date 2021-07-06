import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
    private cartService: CartService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {

    const productId = this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
    
  }

  addToCart(){
    console.log(`Adding to cart : ${this.product.name}, ${this.product.unitPrice}`);

    const cartItem = new CartItem(this.product);
    
    this.cartService.addToCart(cartItem);
  }

  goBack(){

    this.location.back();

  }

}