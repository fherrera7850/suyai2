import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shop.css";
import "./styles/Product.css";
import { formatSubtotal } from "../../utils/Numbers";
import { useAuth } from './../../context/AuthContext';
import { getCookie } from "../../utils/Cookie";

export const Shop = () => {

  const [arrProducts, setArrProducts] = useState([]);
  const { setUserId, userId } = useAuth();

  useEffect(() => {
    if (getCookie("userId")) {
      console.log("🚀 ~ App ~ getCookie(userId):", getCookie("userId"))
      setUserId(getCookie("userId"));
    }

    const fetchProducts = async (userId) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/producto/getProductos/' + userId);

        setArrProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }

    };

    fetchProducts(getCookie("userId")); // se debe llamar a la función desde adentro porque useeffect no es asincrono
  }, []);

  const actualizaCarro = async (idProducto, action) => {
    
    console.log("🚀 ~ actualizaCarro ~ getCookie(rol):", getCookie("rol"))
    if (getCookie("userId") > 0 && getCookie("rol") === 'c') {
      await axios.post(process.env.REACT_APP_API_URL + '/carrito/actualizaCarrito', {
        idUsuario: userId,
        idProducto: idProducto,
        action: action
      })
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          setArrProducts(response.data);
        })
        .catch(error => {
          console.error('Error al realizar la petición:', error);
        });
    } else {
      alert("Cuenta no autorizada. Inicie sesión o regístrese como cliente.");
    }


  };



  return (
    <div className="shop">
      <div className="shopTitle">
        <h1 style={{ fontSize: 40, fontFamily: "sans-serif" }}>Catálogo de productos</h1>
      </div>

      <div className="products" style={{ fontSize: 18 }}>
        {arrProducts.map((product) => (
          <div className="product">
            <img src={require(`./../../${product.imagen}`)} alt={product.nombreProducto} />
            <div className="descripcion">
              <p>
                <b>{product.nombreProducto}</b>
              </p>
              <p>${formatSubtotal(product.precio)}</p>
            </div>
            {product.cantidad === 0 ? ( //se muestra el boton de añadir al carrito solo cuando la cant es 0
              <button className="add-to-cart-btn" onClick={() => { actualizaCarro(product.idProducto, "add") }}>
                Añadir al carrito
              </button>
            ) : (
              <div className="cart-controls">
                <button className="remove-from-cart-btn" onClick={() => { actualizaCarro(product.idProducto, "remove") }}>
                  -
                </button>
                <span className="cart-quantity">{product.cantidad}</span>
                <button className="add-to-cart-btn" onClick={() => { actualizaCarro(product.idProducto, "add") }}>
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
