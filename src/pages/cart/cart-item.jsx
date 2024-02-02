import React from "react";
import { formatSubtotal } from "../../utils/Numbers";

export const CartItem = (props) => { //CartItem

  const { idProducto, cantidad, nombreProducto, precio, imagen} = props.data;

  

  return (
    <div className="cartItem">
      <img src={require(`../../${imagen}`)} alt={nombreProducto}/>
      <div className="description">
        <p>
          <b style={{color: "darkslategray"}}>{nombreProducto}</b>
        </p>
        <p style={{color: "darkslategray"}}> Precio: ${formatSubtotal(precio)}</p>
        <div className="countHandler">
          <button onClick={() => {}} className="add-to-cart-btn"> - </button>
          <input disabled
          style={{fontSize: 20, alignSelf: "center", marginLeft: 10, marginRight: 10, width: 30, textAlign: "center"}}
            value={cantidad}
            //onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => {}} className="add-to-cart-btn"> + </button>
        </div>
      </div>
    </div>
  );
};
