import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { IoCartOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/home"> Home </Link>
        <Link to="/"> Catálogo de productos </Link>
        <Link to="/"> Ver pedidos </Link>
        <Link to="/"> Información de la cuenta </Link>
        <Link to="/contact"> Ayuda </Link> 
        <Link to="/cart">
          <IoCartOutline size={32}/>
        </Link>
        
      </div>
    </div>
  );
};
