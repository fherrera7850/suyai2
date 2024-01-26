import React from "react";
import "./cliente.css";

export const PedidosC = () => {
  return (
    <> 
      <h1 style={{fontSize: 40, fontFamily: "sans-serif", textAlign: "center", color: "darkslategray"}}>Historial de pedidos</h1>
      <br />
      <div className="historialPedidos">
        <select>
          <option value="">Seleccione pedido</option>
          <option value="">Pedido N°1111</option>
          <option value="">Pedido N°2222</option>
          <option value="">Pedido N°3333</option>
        </select>
        <button class="btnListar">Mostrar pedido</button>
      </div>
      <br />
      <div className="mostrarPedido">
        <h3 className="tituloPedido">Pedido N°1111</h3>
        <table className="detallePedido">
          <tr>
            <td>Fecha: </td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>Detalle: </td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>Nombre Cliente: </td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>Direccion: </td>
            <td><input type="text" /></td>
          </tr>
        </table>
      </div>
      
    </>
  );
   
};