import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { formatSubtotal } from '../../utils/Numbers';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from './../../context/AuthContext';
import { getCookie } from '../../utils/Cookie';

export const Success = () => {

  const { id } = useParams(); //idPedido
  const [idUsuario, setIdUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [formaEntrega, setFormaEntrega] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState('');

  const navigate = useNavigate();
  const { setUserId,userId } = useAuth();

  useEffect(() => {
    if (getCookie("userId")) {
      console.log("🚀 ~ App ~ getCookie(userId):", getCookie("userId"))
      setUserId(getCookie("userId"));
    }
    const fetchOrder = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/pedido/getPedidoById/' + id);
        const pedido = response.data;
        console.log("🚀 ~ fetchOrder ~ response.data:", response.data)
        setIdUsuario(pedido.idUsuario);
        setNombre(pedido.nombreCompleto);
        setEmail(pedido.email);
        setFormaEntrega(pedido.formaEntrega);
        setDireccionEntrega(pedido.direccionEntrega);
        setFecha(pedido.fechaPedido);
        setTotal(pedido.total);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchOrder(id); // se debe llamar a la función desde adentro porque useeffect no es asincrono

  }, []);

  
  if (parseInt(userId) !== parseInt(idUsuario)) {
    return (
      <div className="maincontainer">

        <div class="container">
          <div class="py-5 text-center">
            <h2>NO AUTORIZADO</h2>
          </div>
        </div>
      </div>
    )
  } else {
    return (

      <div className="maincontainer">

        <div class="container">
          <div class="py-5 text-center">

            <h2>Compra Exitosa</h2>
            <h4>Pedido nro. {id}</h4>

          </div>
          <div class="row">
            {/* Datos Checkout */}
            <div class="col-md-12 order-md-1">
              <h3 class="mb-3">Datos Compra</h3>
              <hr className="mb-4" />
              <form class="needs-validation" novalidate>
                <div class="row">
                  <div class="mb-3">
                    <b>Nombre Completo: </b>
                    <label for="firstName">{nombre} </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Email: </b>
                    <label for="firstName">{email} </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Forma de entrega: </b>
                    <label for="firstName">{formaEntrega} </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Dirección de entrega: </b>
                    <label for="firstName">{direccionEntrega} </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Plazo de entrega: </b>
                    <label for="firstName">3 días a partir de la fecha de compra </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Fecha: </b>
                    <label for="firstName">{fecha} hrs.</label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Medio de Pago: </b>
                    <label for="firstName">Tarjeta de Crédito </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Total (CLP): </b>
                    <label for="firstName">{total}</label>
                  </div>
                </div>

                <hr className="mb-4" />

                <div class="col-md-12 mb-3">
                  <div class="d-flex justify-content-end">
                    <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/')}>Volver al catálogo</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; <b>2024 AguaSuyai.cl</b></p>
            <ul class="list-inline">
              <li class="list-inline-item"><a href="#">Privacidad</a></li>
              <li class="list-inline-item"><a href="#">Términos</a></li>
              <li class="list-inline-item"><a href="#">Soporte</a></li>
            </ul>
          </footer>
        </div>

      </div>

    );
  }
};

