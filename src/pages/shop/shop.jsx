import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shop.css";
import "./styles/Product.css";

export const Shop = () => {

  const [arrProducts, setArrProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.100.4:4000/api/producto/getProductos');
        response.data.forEach(element => {
          element.cantidad = 0; // se inicializa la cantidad en 0
        });
        setArrProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts(); // se debe llamar a la función desde adentro porque useeffect no es asincrono
  }, []);

  const addToCart = async (idProducto, cantidad) => {
    
      //'http://192.168.100.4:4000/api/carrito/actualizaCarrito'
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
              <button className="add-to-cart-btn" onClick={() => { addToCart(product.idProducto) }}>
                Añadir al carrito
              </button>
            ) : (
              <div className="cart-controls">
                <button className="remove-from-cart-btn" onClick={() => { }}>
                  -
                </button>
                <span className="cart-quantity">{product.cantidad}</span>
                <button className="add-to-cart-btn" onClick={() => { }}>
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
