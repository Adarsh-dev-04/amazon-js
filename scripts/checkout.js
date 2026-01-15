import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentOrderSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
// import '../data/backend-practice.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try{
        // throw 'error1';
        await loadProductsFetch();
    
    const value= await new Promise((resolve)=>{
        loadCart(()=>{
        // throw 'error';
        // reject('error');
        resolve('value2');
        });
    })
    }
    catch(error){
        console.log('unexpected error occured');
    }

    renderOrderSummary();
    paymentOrderSummary();
}
loadPage();
/*
Promise.all([
    loadProductsFetch()
    ,new Promise((resolve)=>{
        loadCart(()=>{
        resolve();
        });
    })
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    paymentOrderSummary();
});
*/

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('value1');
//     })
// }).then((value)=>{
//     console.log(value);
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//         resolve();
//         });
//     });
// }).then(()=>{
//     renderOrderSummary();
//     paymentOrderSummary();
// })

// loadProducts(()=>{  
//     renderOrderSummary();
//     paymentOrderSummary();
// });
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