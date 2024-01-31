import React, { useEffect, useState } from "react";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { formatSubtotal } from "../../utils/Numbers";

import "./cart.css";
import axios from "axios";

export const Cart = () => {
  //const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  const [arrProducts, setArrProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchProducts = async (userId) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/producto/getProductos/' + userId);
        let monto = 0;
        response.data.forEach(element => {
          monto += element.precio * element.cantidad;  
        });
        setTotalAmount(monto);
        setArrProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }

    };

    const idUsuario = 1; //simula sesion
    fetchProducts(idUsuario); // se debe llamar a la función desde adentro porque useeffect no es asincrono
  }, []);


  return (
    <div className="cart">
      <div>
        <h1 style={{ color: "darkslategray" }}>Carrito de compras</h1>
      </div>
      <div className="cart">
        {arrProducts.map((product) => {
          return <CartItem data={product} key={product.id} />;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "left" }}>
            Subtotal: <b>${formatSubtotal(totalAmount)}</b>
          </p>
          <button onClick={() => navigate("/")}>Continuar comprando</button>
          <button
            onClick={() => { navigate("/checkout"); }}
            style={{ fontSize: 15 }}
          >
            Completar pedido
          </button>
        </div>
      ) : (
        <h1 style={{ color: "darkslategray" }}>
          Tu carrito de compra está vacío
        </h1>
      )}
    </div>
  );

};
