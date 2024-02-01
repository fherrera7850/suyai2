import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { formatSubtotal } from '../../utils/Numbers';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export const Success = () => {

  return (
    
      <div className="maincontainer">

        <div class="container">
          <div class="py-5 text-center">

            <h2>Compra Exitosa</h2>
            <h4>Pedido nro. 23234</h4>

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
                    <label for="firstName">Rodrigo Mancilla Delgado </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Email: </b>
                    <label for="firstName">rmancillad@gmail.com </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Forma de entrega: </b>
                    <label for="firstName">Despacho a domicilio </label>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                    <b>Dirección de entrega: </b>
                    <label for="firstName">Berlín 1000 (depto 2204), San Miguel, Chile </label>
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
                    <label for="firstName">01-02-2024 16:51:09 hrs</label>
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
                    <label for="firstName">$ 29.800</label>
                  </div>
                </div>
                
                <hr className="mb-4" />

                <div class="col-md-12 mb-3">
                  <div class="d-flex justify-content-end">
                    <button className="btn btn-primary btn-lg" type="button">Volver al catálogo</button>
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
};

