import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
    

export function paymentOrderSummary(){
    let itemTotal=0;
    let shippingTotal=0;
    let totalBeforeTax=0;
    let tax=0;
    let total=0;
    let paymentHTML=``;
    cart.forEach((cartItem)=>{
        products.forEach((product)=>{
            if(product.id==cartItem.productId)
            {
                itemTotal+=product.priceCents*cartItem.quantity;
            }
        })
        deliveryOptions.forEach((Option)=>{
            if(cartItem.deliveryOptionId==Option.id)
            {
                shippingTotal+=Option.priceCents;
            }
        })
    })
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    totalBeforeTax=itemTotal+shippingTotal;
    tax=totalBeforeTax*0.1;
    total=totalBeforeTax+tax;
    paymentHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${(itemTotal/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingTotal/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
        document.querySelector(".payment-summary").innerHTML=paymentHTML;
}