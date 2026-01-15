export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
    cart=[];
}
export function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId,quantitySelect){
    let matchingitem;
          cart.forEach((cartItem)=>{
              if(productId==cartItem.productId)
              {
                  matchingitem=cartItem;
              }
          });
          if(matchingitem)
          {
              matchingitem.quantity+=quantitySelect;
          }
          else{
              cart.push({productId : productId,
                  quantity:quantitySelect,
                  deliveryOptionId:'1'
              });
          }
        saveCart();
}
export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId)
            newCart.push(cartItem);
    })
    cart=newCart;
    saveCart();
}
export function updateDeliveryOptionId(productId,deliveryOptionId)
{
    let matchingitem;
          cart.forEach((cartItem)=>{
              if(productId==cartItem.productId)
              {
                  matchingitem=cartItem;
              }
          });
          matchingitem.deliveryOptionId=deliveryOptionId;
          saveCart();
}
export function loadCart(fun){
  const xhr=new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
      console.log(xhr.response);
      fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}