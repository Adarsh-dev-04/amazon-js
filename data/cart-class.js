class Cart{
    cartItems;
    localStorageKey;
    constructor(lk){
        this.localStorageKey=lk;
        this.loadFromStorage();
    }
    loadFromStorage(){

        this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));

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
    }
    saveCart(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }
    addToCart(productId,quantitySelect){
        let matchingitem;
              this.cartItems.forEach((cartItem)=>{
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
                  this.cartItems.push({productId : productId,
                      quantity:quantitySelect,
                      deliveryOptionId:'1'
                  });
              }
            this.saveCart();
    }
    removeFromCart(productId){
        const newCart=[];
        cartItems.forEach((cartItem)=>{
            if(cartItem.productId!==productId)
                newCart.push(cartItem);
        })
        cartItems=newCart;
        saveCart();
    }
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
const cart=new Cart('cart-oop');
const bussinessCart=new Cart('cart-bussiness');
console.log(cart);
console.log(bussinessCart);
