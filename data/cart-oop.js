function Cart(localStorageKey)
{
    const cart={
    cartItems:undefined,
    loadFromStorage(){

        this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));

        if(!this.cartItems)
            {
            this.cartItems=[{
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
    },
    saveCart(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
    addToCart(productId,quantitySelect){
        let matchingitem;
              cartItems.forEach((cartItem)=>{
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
                  cartItems.push({productId : productId,
                      quantity:quantitySelect,
                      deliveryOptionId:'1'
                  });
              }
            saveCart();
    },
    removeFromCart(productId){
        const newCart=[];
        cartItems.forEach((cartItem)=>{
            if(cartItem.productId!==productId)
                newCart.push(cartItem);
        })
        cartItems=newCart;
        saveCart();
    },
    updateDeliveryOptionId(productId,deliveryOptionId)
    {
    let matchingitem;
          cartItems.forEach((cartItem)=>{
              if(productId==cartItem.productId)
              {
                  matchingitem=cartItem;
              }
          });
          matchingitem.deliveryOptionId=deliveryOptionId;
          saveCart();
    }
    };
    return cart;
}
const cart=Cart('cart-oop');
const bussinessCart=Cart('cart-bussiness');
cart.loadFromStorage();
bussinessCart.loadFromStorage();
console.log(cart);
console.log(bussinessCart);