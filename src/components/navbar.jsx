

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from './../context/AuthContext';
import { deleteCookie, getCookie, setCookie } from "../utils/Cookie";

export const Navbar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const LoginRegistro = () => {
    if (!isLoggedIn) {
      const cookieUserId = getCookie("userId");
      console.log("🚀 ~ LoginRegistro ~ cookieUserId:", cookieUserId)
      if (cookieUserId) {
        setIsLoggedIn(true)
        return (<button onClick={() => Logout()} className="registroUsuario"><MdAccountCircle size={30} /> Cerrar Sesión</button>)
      }
      else {
        setIsLoggedIn(false)
        return (<Link to="/registroUsuario" className="registroUsuario"><MdAccountCircle size={30} /> Login/Registro</Link>)
      }
    } else {
      if (!getCookie("userId") || getCookie("userId") === 0) {
        return (<Link to="/registroUsuario" className="registroUsuario"><MdAccountCircle size={30} /> Login/Registro</Link>)
      }
      else {
        return (<button onClick={() => Logout()} className="registroUsuario"><MdAccountCircle size={30} /> Cerrar Sesión</button>)
      }
    }
  }

  const Logout = () => {
    deleteCookie("userId");
    deleteCookie("rol");
    setIsLoggedIn(false);
    window.alert('Sesión cerrada exitosamente');
    window.location.href = '/home';
  }

  const PedidosCuenta = () => { //Muestra el menu cuenta e historial de pedidos solo cuenta hay sesion iniciada
    if (isLoggedIn) {
      return (<>
        <Link to="/cliente/pedidosCliente" className="pedidos">Historial de pedidos</Link>
        <Link to="/cliente/cuentaCliente" className="cuenta">Cuenta</Link>
      </>)
    } else {
      return (<></>) //se ocultan
    }
  }

  return (
    <div className="navbarSite">
      <div className="linksContainer">
        <Link to="/home" className="inicio">Inicio</Link>
        <Link to="/" className="catalogo">Catálogo de productos</Link>

        {/* <Link to="/cliente/pedidosCliente" className="pedidos">Historial de pedidos</Link>
        <Link to="/cliente/cuentaCliente" className="cuenta">Cuenta</Link> */}
        <PedidosCuenta />

        {/* <Link to="/contact" className="ayuda">Ayuda</Link> */}
      </div>
      <div className="rightLinksContainer">
        <Link to="/cart" className="carrito"><IoCartOutline size={30} /></Link>
        {/* {isLoggedIn ? (
          <Link to="/registroUsuario" className="registroUsuario"><MdAccountCircle size={30} /> Cerrar Sesión</Link>
        ) : (
          <Link to="/registroUsuario" className="registroUsuario"><MdAccountCircle size={30} /> Login/Registro</Link>
        )} */}
        <LoginRegistro />
      </div>
    </div>
  );
};










/* import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">Suyai Agua Purificada</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Enlace 1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Enlace 2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Enlace 3</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  );
} */

