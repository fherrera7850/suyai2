import React from "react";
import "./styles/Product.css"; // Importamos un archivo CSS para los estilos

export const Product = (props) => {
  /* const { id, productName, price, productImage } = props.data;

  const [quantity, setQuantity] = useState(cartItems[id] || 0);

  const handleAddToCart = () => {
    addToCart(id);
    setQuantity((prevQuantity) => prevQuantity + 1); //Se le pasa otra funcion que toma lo que ya tiene + 1
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      removeFromCart(id);
      setQuantity((prevQuantity) => prevQuantity - 1); //Se le pasa otra funcion que toma lo que ya tiene - 1
    }
  }; */

  return (
    <div className="product">
      {/* <img src={productImage} alt={productName} />
      <div className="descripcion">
        <p>
          <b>{productName}</b>
        </p>
        <p>${formatSubtotal(price)}</p>
      </div>
      {quantity === 0 ? ( //se muestra el boton de añadir al carrito solo cuando la cant es 0
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      ) : (
        <div className="cart-controls">
          <button className="remove-from-cart-btn" onClick={handleRemoveFromCart}>
            -
          </button>
          <span className="cart-quantity">{quantity}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            +
          </button>
        </div>
      )} */}
    </div>
  );
};
