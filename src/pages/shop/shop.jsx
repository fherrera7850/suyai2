import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shop.css";
import "./styles/Product.css";

export const Shop = () => {

  const [arrProducts, setArrProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async (userId) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/producto/getProductos/' + userId);
       
        setArrProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }

    };

    const idUsuario = 1; //simula sesion
    fetchProducts(idUsuario); // se debe llamar a la función desde adentro porque useeffect no es asincrono
  }, []);

  const actualizaCarro = async (idProducto, action) => {

    const idUsuario = 1; //simula sesion

    await axios.post(process.env.REACT_APP_API_URL + '/carrito/actualizaCarrito', {
      idUsuario: idUsuario,
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

  };

  const formatSubtotal = (amount) => {
    return amount.toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    });
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
