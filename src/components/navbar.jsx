import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { IoCartOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/home" className="inicio"> Inicio </Link>
        <Link to="/" className="catalogo"> Catálogo de productos </Link>
        <Link to="/cliente/pedidosCliente" className="pedidos"> Historial de pedidos </Link>
        <Link to="/cliente/cuentaCliente" className="cuenta"> Cuenta </Link>
        <Link to="/contact" className="ayuda"> Ayuda </Link> 
        <Link to="/cart" className="carrito">
          <IoCartOutline className="iconoCarrito" size={28}/>
        </Link>
        
      </div>
    </div>
  );
};
