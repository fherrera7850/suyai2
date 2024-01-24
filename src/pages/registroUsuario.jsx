import React from "react";
import homeImage from "../assets/home.jpg";
import "index.css";

export const Home = () => {
  return (
    <> 
      <title>Registro de usuario</title>
      <h1 className="Bienvenida">¡Bienvenido, Charles!</h1>
      <br />
      <div style={{textAlign: "center"}}>
        <img src={homeImage} alt="Home" style={{width: '50%', height: 'auto'}}/>
      </div>
      <br />
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