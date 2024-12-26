export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
    cart=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'2'
    },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId: '1'
    }
    ];
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
              matchingitem.quantity++;
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