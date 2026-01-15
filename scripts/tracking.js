import { products,loadProductsFetch } from "../data/products.js";

async function loadTrackingPage() {
    await loadProductsFetch();
    renderTracking();
}
loadTrackingPage();
function renderTracking(){
    const url= new URL(window.location.href);
    const productId=url.searchParams.get('productId');
    const dT=url.searchParams.get('deliveryTime');
    const productQuantity=url.searchParams.get('productQuantity');
    let matchingItem='';
    products.forEach((product)=>{
        if(product.id===productId)
            matchingItem=product;
    })

    let trackingHtml=`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${orderTimeCalc(dT)}
        </div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${productQuantity}
        </div>

        <img class="product-image" src="${matchingItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      `;
      document.querySelector('.order-tracking').innerHTML=trackingHtml;
}
function orderTimeCalc(orderTime){
  const date=new Date(orderTime);
  const day=date.toLocaleString('default',{weekday:'long'})
  const dateMonth=date.toLocaleString('default',{month: 'long'});
  const dateD=date.getDate();
  return `${day}, ${dateMonth} ${dateD}`;
}