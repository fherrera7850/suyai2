import React from "react";
import "./cliente.css";

export const CuentaC = () => {
  return (
    <> 
      <h1 style={{fontSize: 40, fontFamily: "sans-serif", textAlign: "center", color: "darkslategray"}}>Información de la cuenta</h1>

      <div className="infoCuenta">
        <table>
          <tr>
            <td>Nombre de usuario: </td>
            <td><input type="text" /></td>
          </tr>
          <br />
          <tr>
            <td>Contraseña: </td>
            <td><input type="password" /></td>
          </tr>
          <br />
          <tr>
            <td>Email: </td>
            <td><input type="text" /></td>
          </tr>
          <br />
          <tr>
            <td>Direccion: </td>
            <td><input type="text" /></td>
          </tr>
          <br />
          <tr>
            <td>Telefono de contacto: </td>
            <td><input type="text" /></td>
          </tr>
          <br />
          <div className="botonesCuenta">
            <button className="btnEditar">Editar</button>
            <button className="btnGuardar">Guardar</button>
          </div>
          
        </table>
      </div>
    </>
  );
   
};