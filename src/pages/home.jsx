import React from "react";
import homeImage from "../assets/home.jpg";

export const Home = () => {
  return (
    <> 
      <label className="bienvenida">¡Bienvenido, Charles!</label>
      <br />
      <img src={homeImage} alt="Home" style={{width: '50%', height: 'auto'}}/>
      <div>
        Bienvenido a la web de Aguas Suyai, somos una empresa dedicada a la distribución y comercialización de agua purificada, alcalina y productos afines. Si deseas:
        <br/>
        - Agendar un pedido o consultar el catálogo de productos haga click en "Catálogo de productos" en el menú superior de la página y agregue los productos al carrito de compra.
        <br/>
        - Revisar sus pedidos haga click en "Ver pedidos" en el menú superior de la página.
        <br/>
        - Revisar o editar la información de su cuenta haga click en "Información de la cuenta" en el menú superior de la página.
      </div>
      
    </>
  );
   
};