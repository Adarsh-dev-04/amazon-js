import { cart,addToCart } from "../data/cart.js";
import { products,loadProducts } from "../data/products.js";
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  })
}).then(()=>{
  productRender();
})
export function productRender(){
    let producthtml='';
    updatecartquantity();
    products.forEach((product)=>{
        producthtml+=
        `<div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
              <div class="product-price">
                $${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select class="product-quantity-select-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              ${product.extraInfoHTML()}
              <div class="product-spacer"></div>

              <div class="added-to-cart added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>`
    });
    function updatecartquantity(){
      let cartQuantity=0;
            cart.forEach((cartItem)=>{
                cartQuantity+=cartItem.quantity;
            });
            document.querySelector('.cart-quantity').innerHTML=cartQuantity;
    }
    function addToCartAnimation(productId){
      let atc=document.querySelector(`.added-to-cart-${productId}`);
            atc.style.opacity='100';
            setTimeout(() => {
              atc.style.opacity='80';
            }, 900);
            setTimeout(() => {
              atc.style.opacity='60';
            }, 1050);
            setTimeout(() => {
              atc.style.opacity='40';
            }, 1200);
            setTimeout(() => {
              atc.style.opacity='20';
            }, 1350);
            setTimeout(() => {
              atc.style.opacity='0';
            }, 1500);
    }
    document.querySelector(".js-products-grid").innerHTML=producthtml;
    document.querySelectorAll(".js-add-to-cart").forEach((button)=>{
        button.addEventListener('click',()=>{
            const productId=button.dataset.productId;
            let quantitySelect=parseInt(document.querySelector(`.product-quantity-select-${productId}`).value);
            addToCart(productId,quantitySelect);
            updatecartquantity();
            addToCartAnimation(productId);
        })
    });
}
export function loadingAnimationStart(){
  document.querySelector('.loading-div').classList.add('.loading-div-transition');
document.querySelector('.loading-div').style.width='20vmax';
}
export function loadingAnimationEnd(){
  document.querySelector('.loading-div').style.width='100vmax';
  setTimeout(()=>{
    document.querySelector('.loading-div').classList.remove('.loading-div-transition');
    document.querySelector('.loading-div').style.width='0';
  },2000)
}