import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PedidosCliente = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallePedido, setDetallePedido] = useState(null);

  useEffect(() => {
    const idUsuario = 29; // Simula sesión
    fetchPedidos(idUsuario);
  }, []);

  useEffect(() => {
    // Cuando cambia el pedido seleccionado, realiza una nueva solicitud para obtener los detalles
    if (selectedPedido) {
      fetchDetallePedido(selectedPedido);
    }
  }, [selectedPedido]);

  const fetchPedidos = async (idUsuario) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/pedido/getPedidos/${idUsuario}`);
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const fetchDetallePedido = async (idPedido) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/pedido/getDetallePedido/${idPedido}`);
      setDetallePedido(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del pedido:', error);
    }
  };

  const handlePedidoChange = async (idPedido) => {
    setSelectedPedido(idPedido);
  };
  
  const handleMostrarPedido = async () => {
    if (selectedPedido) {
      //Es una función que realiza una solicitud para obtener los detalles del pedido asociado al selectedPedido (pedido seleccionado).
      fetchDetallePedido(selectedPedido);
    }
  };

  return (
    <div>
      <h1>Pedidos del Cliente</h1>
      <div>
        <label htmlFor="pedidos">Selecciona un pedido:</label>
        <select id="pedidos" onChange={(e) => handlePedidoChange(e.target.value)}>
          <option value="" disabled selected>
            Selecciona un pedido
          </option>
          {pedidos.map((pedido) => (
            <option key={pedido.idPedido} value={pedido.idPedido}>
              Pedido #{pedido.idPedido} - {pedido.fecha}
            </option>
          ))}
        </select>
        <button onClick={() => handleMostrarPedido()}>
                  Mostrar pedido
                </button>
      </div>

      {selectedPedido && (
        <div>
          <h2>Detalle del Pedido #{selectedPedido}</h2>
          {detallePedido ? (
            <table>
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>ID Pedido</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {detallePedido.map((detalle) => (
                  <tr key={detalle.idCarrito}>
                    <td>{detalle.idProducto}</td>
                    <td>{detalle.idPedido}</td>
                    <td>{detalle.cantidad}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          ) : (
            <p> Cargando detalles del pedido...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PedidosCliente;

/*
import React, { useState, useEffect } from "react";
import "./cliente.css";
import axios from "axios";

export const PedidosC = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState("");
  const [pedidoDetails, setPedidoDetails] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Hacer la solicitud GET para obtener la lista de pedidos disponibles
        const response = await axios.get("http://192.168.100.22:4000/api/pedido/getPedidos/1");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error fetching pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const fetchPedidoDetails = async (pedidoId) => {
    try {
      // Hacer la solicitud GET para obtener los detalles del pedido seleccionado
      const response = await axios.get(`http://192.168.100.22:4000/api/pedido/getPedido/${pedidoId}`);
      setPedidoDetails(response.data[0]);
    } catch (error) {
      console.error("Error fetching pedido details:", error);
    }
  };

  const handlePedidoChange = (e) => {
    const selectedPedidoId = e.target.value;
    setSelectedPedido(selectedPedidoId);
    // Al cambiar el pedido, también cargamos los detalles del pedido seleccionado
    fetchPedidoDetails(selectedPedidoId);
  };

  return (
    <>
      <h1 style={{ fontSize: 40, fontFamily: "sans-serif", textAlign: "center", color: "darkslategray" }}>
        Historial de pedidos
      </h1>
      <br />
      <div className="historialPedidos">
        <select onChange={handlePedidoChange} value={selectedPedido}>
          <option value="">Seleccione pedido</option>
          {pedidos.map((pedido) => (
            <option key={pedido.idPedido} value={pedido.idPedido}>
              Pedido N°{pedido.idPedido}
            </option>
          ))}
        </select>
        <button className="btnListar">Mostrar pedido</button>
      </div>
      <br />
      {pedidoDetails && (
        <div className="mostrarPedido">
          <h3 className="tituloPedido">Pedido N°{pedidoDetails.idPedido}</h3>
          <table className="detallePedido">
            <tr>
              <td>Fecha: </td>
              <td>{pedidoDetails.fecha}</td>
            </tr>
            <tr>
              <td>Estado: </td>
              <td>{pedidoDetails.estado}</td>
            </tr>
            <tr>
              <td>Monto: </td>
              <td>{pedidoDetails.monto}</td>
            </tr>
            {/* Agrega más detalles según la estructura real de tu pedido }
          </table>
          <textarea
            value={JSON.stringify(pedidoDetails, null, 2)}
            rows={10}
            style={{ width: "100%" }}
            readOnly
          />
        </div>
      )}
    </>
  );
};
*/
/*
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
*/