import React, { useState, useEffect } from "react";
import "./cliente.css";

export const PedidosC = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState("");
  const [pedidoDetails, setPedidoDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está logueado al cargar el componente
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://192.168.100.22:4000/api/login/checkLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Agrega aquí cualquier header necesario para la autenticación
          },
          credentials: "include",  // Para incluir las cookies en la solicitud
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          alert("Usuario no logueado. Debes iniciar sesión.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud");
      }
    };

    checkLoginStatus();
  }, []);  // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

  const handlePedidoSelect = async () => {
    // Verificar si el usuario está logueado antes de mostrar detalles del pedido
    if (!isLoggedIn) {
      alert("Usuario no logueado. Debes iniciar sesión.");
      return;
    }

    if (selectedPedido) {
      // Hacer una solicitud GET para obtener los detalles del pedido seleccionado
      try {
        const response = await fetch(`http://192.168.100.22:4000/api/pedido/getPedido/${selectedPedido}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Agrega aquí cualquier header necesario para la autenticación
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setPedidoDetails(data[0]);  // Actualizar el estado de pedidoDetails con los detalles obtenidos
        } else {
          alert("Error al obtener los detalles del pedido");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud");
      }
    } else {
      // Limpiar detalles si no se ha seleccionado ningún pedido
      setPedidoDetails({});
    }
  };

  return (
    <> 
      <h1 style={{ fontSize: 40, fontFamily: "sans-serif", textAlign: "center", color: "darkslategray" }}>Historial de pedidos</h1>
      <br />
      <div className="historialPedidos">
        <select value={selectedPedido} onChange={(e) => setSelectedPedido(e.target.value)}>
          <option value="">Seleccione pedido</option>
          {pedidos.map((pedido) => (
            <option key={pedido.idPedido} value={pedido.idPedido}>
              Pedido N°{pedido.idPedido}
            </option>
          ))}
        </select>
        <button onClick={handlePedidoSelect} className="btnListar">
          Mostrar pedido
        </button>
      </div>
      <br />
      <div className="mostrarPedido">
        <h3 className="tituloPedido">Detalle del Pedido</h3>
        <table className="detallePedido">
          <tbody>
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
            {/* Agrega aquí más detalles según tu estructura de datos */}
          </tbody>
        </table>
      </div>
    </>
  );
};

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