import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/Cookie';
import { formatSubtotal } from "../../utils/Numbers";

const PedidosCliente = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallePedido, setDetallePedido] = useState(null);
  const styles = { //estilo para tabla de pedidos
    table: {
      borderCollapse: 'collapse',
      width: '100%',
    },
    th: {
      backgroundColor: '#f2f2f2',
      borderBottom: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
  };

  useEffect(() => {
    const idUsuario = getCookie('userId');
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/pedido/getOrdersByUser/${idUsuario}`);
      console.log("🚀 ~ fetchPedidos ~ response.data:", response.data)
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const fetchDetallePedido = async (idPedido) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/pedido/getDetallePedido/${idPedido}`);
      console.log("🚀 ~ fetchDetallePedido ~ response.data:", response.data)
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

  if (getCookie('userId') > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Pedidos del Cliente</h1>
        <div>
          <label style={{fontSize: 25 }} htmlFor="pedidos">Selecciona un pedido: </label>
          <select id="pedidos" onChange={(e) => handlePedidoChange(e.target.value)} style={{ marginLeft: 10, fontSize: 25 }}>
            <option value="" disabled selected>
              Selecciona un pedido
            </option>
            {pedidos.map((pedido) => (
              <option key={pedido.idPedido} value={pedido.idPedido}>
                Pedido #{pedido.idPedido} - {pedido.fecha}
              </option>
            ))}
          </select>
        </div>
        <br /><br />
        {selectedPedido && detallePedido && (
          <div>
            <h2>Detalle del Pedido #{selectedPedido}</h2>
            <p><b>Usuario:</b> {detallePedido[0]?.nombreUsuario}</p>
            <p><b>Fecha:</b> {detallePedido[0]?.fecha}</p>
            <p><b>Estado:</b> {detallePedido[0]?.estado === 'C' ? 'Completado' : 'Rechazado'}</p>
            <p><b>Total:</b> {'$' + formatSubtotal(detallePedido[0]?.monto)}</p>
            <p><b>Forma Entrega:</b> {detallePedido[0]?.formaEntrega === 'T' ? 'Retiro en Tienda' : 'Despacho'}</p>
            <p><b>Direccion:</b> {detallePedido[0]?.formaEntrega === 'T' ? 'Las Araucarias 169, El Bosque, RM, Chile' : detallePedido[0]?.direccion}</p>
            <br /><br />
            {detallePedido ? (
              <>
                <h2>Productos</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Nombre Producto</th>
                      <th style={styles.th}>Cantidad</th>
                      <th style={styles.th}>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detallePedido?.map((producto, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{producto.nombreProducto}</td>
                        <td style={styles.td}>{producto.cantidad}</td>
                        <td style={styles.td}>{'$' + formatSubtotal(producto.precio)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p> Cargando detalles del pedido...</p>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>NO AUTORIZADO</h1>
      </div>
    )

  }


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