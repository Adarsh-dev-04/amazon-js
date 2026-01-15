import { cart,addToCart } from "../data/cart.js";
import { orders } from "../data/order.js";
import { products,loadProductsFetch } from "../data/products.js";

async function loadOrderPage()
{
    await loadProductsFetch();
    renderMyOrder();
    document.querySelectorAll('.js-buy-it-again').forEach((button)=>{
        button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        addToCart(productId,1);
        updatecartquantity();
    });
    })
}

function renderMyOrder(){
let orderHtml='';
orders.forEach((order)=>{
    orderHtml+=`
    <div class="order-container">
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTimeCalc(order.orderTime)}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${((order.totalCostCents)/100).toFixed(2)}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label-${order.id}">Order ID:</div>
            <div>${order.id}</div>
        </div>
        </div>

        <div class="order-details-grid">
        ${renderProductDetail(order)}
        </div>
    </div>
    `;
})
function renderProductDetail(order){
    let productHtml='';
    order.products.forEach((product)=>{
        let matchingItem;
        products.forEach((pr)=>{
            if(product.productId===pr.id)
            {
                matchingItem=pr;
            }
        })
        productHtml+=
        `<div class="product-image-container">
            <img src="${matchingItem.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
            ${matchingItem.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${orderTimeCalc(product.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
            Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-it-again" data-product-id="${matchingItem.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}&productQuantity=${product.quantity}&deliveryTime=${product.estimatedDeliveryTime}">
            <button class="track-package-button track-package-button-${matchingItem.id} button-secondary">
                Track package
            </button>
            </a>
        </div>
        `;
    })
    return productHtml;
}
document.querySelector('.orders-grid').innerHTML=orderHtml;
}
function orderTimeCalc(orderTime){
    const date=new Date(orderTime);
    const dateMonth=date.toLocaleString('default',{month: 'long'});
    const dateD=date.getDate();
    return ` ${dateMonth} ${dateD}`;
}
function updatecartquantity(){
    let cartQuantity=0;
          cart.forEach((cartItem)=>{
              cartQuantity+=cartItem.quantity;
          });
          document.querySelector('.cart-quantity').innerHTML=cartQuantity;
  }
loadOrderPage();