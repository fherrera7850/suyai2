import React from "react";
import registroImage from "../assets/logo_suyai.JPG";
import "./index.css";

export const Registro = () => {
  return (
    <> 
      <h1 className="bienvenida" style={{fontSize: 40, fontFamily: "sans-serif"}}>Registro de usuario</h1>
      <br />
      <div className="formularioRegistro">
        
        <form action="">
          <table>
            <tr>
              <td><img src={registroImage} alt="Registro" className="registroImage"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Nombre de usuario: </label></td>
              <td><input type="text" id="nombreUsuario" placeholder="Ejemplo: pepito1998"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Contraseña: </label></td>
              <td><input type="password" id="contraseña" placeholder="*************"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Nombre y apellido: </label></td>
              <td><input type="text" id="nombreCompleto" placeholder="Juanito Yañez Herrera"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Correo electrónico: </label></td>
              <td><input type="email" id="email" placeholder="pepito1234@gmail.com"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Dirección: </label></td>
              <td><input type="text" id="direccion" placeholder="Galvarino 111, El Bosque"/></td>
            </tr>
            <tr>
              <td><label htmlFor="">Teléfono de contacto: </label></td>
              <td><input type="number" id="telefono" placeholder="912345678"/></td>
            </tr>
            <tr>
              <td><button className="btnRegistrar">Registrarme</button></td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
   
};