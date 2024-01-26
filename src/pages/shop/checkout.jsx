import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./../cart/cart-item";

export const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  console.log("🚀 ~ Checkout ~ totalAmount:", totalAmount)

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      
      {Object.keys(cartItems).map((itemId) => {
        const quantity = cartItems[itemId];
        if (quantity > 0) {
          // Aquí puedes renderizar el componente CartItem para cada producto en el carrito
          return <CartItem key={itemId} data={'<zxxssa'} />;
        }
        return null;
      })}

      <div className="total-amount">
        <p>Total: ${totalAmount}</p>
      </div>
      
      {/* Otros elementos o lógica de pago */}
    </div>
  );
};

