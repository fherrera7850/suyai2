import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage}/>
      <div className="descripcion">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="añadirAlCarrito" onClick={() => addToCart(id)}>
        Añadir al carrito {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
