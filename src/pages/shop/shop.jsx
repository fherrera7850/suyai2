import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1 style={{fontSize: 40, fontFamily: "sans-serif"}}>Catálogo de productos</h1>
        <br />
        <p style={{fontSize: 20, fontWeight: "bold", marginTop: 0}}>
          1. Si deseas hacernos un pedido, primero añade uno o más productos al carrito de compra
          <br />
          2. Cuando ya tengas todo lo que deseas, ve al icono del carrito de compras en la parte superior y completa el pago de tus productos.
        </p>
      </div>

      <div className="products" style={{fontSize: 18}}>
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};
