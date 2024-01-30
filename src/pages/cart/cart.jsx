import React from "react";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

export const Cart = () => {
  //const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();



  return (
    <div className="cart">
      <div>
        <h1 style={{ color: "darkslategray" }}>Carrito de compras</h1>
      </div>
      <div className="cart">
        {/* {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />;
          }
        })} */}
      </div>
  
      {/* totalAmount > 0 ? ( */}
        <div className="checkout">
          {/* <p style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "left" }}>
            Subtotal: <b>${formatSubtotal(totalAmount)}</b>
          </p>
          <button onClick={() => navigate("/")}>Continuar comprando</button>}
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
            style={{fontSize:15}}
          >
            Completar pedido
          </button> */}
        </div>
      {/* ) : (
        <h1 style={{ color: "darkslategray" }}>
          Tu carrito de compra está vacío
        </h1>
      ) */}
    </div>
  );
  
};
