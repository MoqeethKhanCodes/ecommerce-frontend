import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 

  cartItems: CartItem[]=[];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> =new Subject<number>();

  constructor() { }

  addToCart(cartItem : CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){

     /* for(let tempCartItem of this.cartItems){

        if(tempCartItem.id == cartItem.id){
          existingCartItem = tempCartItem;
          break;
        }*/

        existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == cartItem.id);


     // }
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      //just add the item to the array
      this.cartItems.push(cartItem);
    }
    //compute cart quantity and cart total
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish new value to all subscribers will recieve the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log("contents of the cart");

    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`Name : ${tempCartItem.name} , Quantity : ${tempCartItem.quantity},
       Unit Price = ${tempCartItem.unitPrice}`);
    }

    //two digit after decimal

    console.log(`Total Price : ${totalPriceValue.toFixed(2)} ,
     Total Quantity :${totalQuantityValue}`);
    console.log("------------------------");

  }
 
  decrementQuantity(cartItem: CartItem) {
    
    cartItem.quantity--;

    if(cartItem.quantity == 0){

      this.remove(cartItem);

    }
    else{
      this.computeCartTotals();
    }

  }
  remove(cartItem: CartItem) {
    
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);

    if( itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }

  }
}
