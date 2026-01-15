import { cart, removeFromCart,updateDeliveryOptionId,saveCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { paymentOrderSummary } from "./paymentSummary.js";
export function renderOrderSummary(){
let cartHtml = "";
cart.forEach((cartItem) => {
  let matchingitem;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      matchingitem = product;
    }
  })
  const deliveryOptionId=cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((Option)=>{
    if(Option.id===deliveryOptionId)
    deliveryOption=Option;
  })
  const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay,'days');
    const dateString =deliveryDate.format("dddd, MMMM D");
cartHtml +=
`<div class="cart-item-container js-cart-item-container-${matchingitem.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingitem.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingitem.name}
        </div>
        <div class="product-price">
          $${matchingitem.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label-${matchingitem.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingitem.id}">
            <span class="js-update-html-${matchingitem.id}">Update</span>
            <input type="number" class="quantity-input quantity-input-${matchingitem.id} hidden">
            <span class="quantity-save-${matchingitem.id} link-primary hidden">Save</span>
          </span>
          <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingitem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionHTML(matchingitem,cartItem)}
      </div>
    </div>
  </div>
`;
})
function deliveryOptionHTML(matchingitem,cartItem) {
  let html='';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay,'days');
    const dateString =deliveryDate.format("dddd, MMMM D");
    const priceString=deliveryOption.priceCents===0?'FREE':`${(deliveryOption.priceCents/100).toFixed(2)}`;
    let isChecked=deliveryOption.id===cartItem.deliveryOptionId;
    html+=
`<div class="delivery-option js-delivery-option"data-product-id="${matchingitem.id}"data-delivery-option-id="${deliveryOption.id}">
   <input type="radio"${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingitem.id}">
    <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
      <div class="delivery-option-price">
        ${priceString} - Shipping
      </div>
  </div>
</div>`;
  })
  return html;
}
document.querySelector(".order-summary").innerHTML = cartHtml;
document.querySelectorAll(".js-delete-link").forEach((del) => {
  const productId = del.dataset.productId;
  del.addEventListener('click', () => {
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updatecartquantity();
    paymentOrderSummary();
  });
});
document.querySelectorAll(".js-update-link").forEach((upd) => {
  const productId = upd.dataset.productId;
  document.querySelector(`.js-update-html-${productId}`).addEventListener('click', () => {
    document.querySelector(`.quantity-input-${productId}`).classList.remove("hidden");
    document.querySelector(`.quantity-save-${productId}`).classList.remove("hidden");
    document.querySelector(`.js-update-html-${productId}`).classList.add("hidden");
  })

  document.querySelector(`.quantity-save-${productId}`).addEventListener('click', () => {
    if (document.querySelector(`.quantity-input-${productId}`).value == '') {
      alert("Value must not be null");
    }
    if (document.querySelector(`.quantity-input-${productId}`).value == '0') {
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updatecartquantity();
    }
    else {
      cart.forEach((cartItem) => {
        if (cartItem.productId == productId) {
          cartItem.quantity = parseInt(document.querySelector(`.quantity-input-${productId}`).value);
        }

      })
      document.querySelector(`.quantity-label-${productId}`).innerHTML = document.querySelector(`.quantity-input-${productId}`).value;
      document.querySelector(`.quantity-input-${productId}`).classList.add("hidden");
      document.querySelector(`.quantity-save-${productId}`).classList.add("hidden");
      document.querySelector(`.js-update-html-${productId}`).classList.remove("hidden");
      updatecartquantity();
    }
    saveCart();
    paymentOrderSummary();
  })
});
function updatecartquantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".return-to-home-link").innerHTML = `${cartQuantity} items`;
}
updatecartquantity();
document.querySelectorAll(".js-delivery-option").forEach((Option)=>{
  const productId=Option.dataset.productId;
  const deliveryOptionId=Option.dataset.deliveryOptionId;
  Option.addEventListener('click',()=>{
    updateDeliveryOptionId(productId,deliveryOptionId);
    renderOrderSummary();
    paymentOrderSummary();
    
  })
})
}