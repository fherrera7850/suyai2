import React, { useEffect, useState } from 'react';
import './styles/Checkout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { formatSubtotal } from '../../utils/Numbers';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export const Checkout = () => {

  const [deliveryOption, setDeliveryOption] = useState('tienda');
  const [showAddress, setShowAddress] = useState(false);
  const [arrProducts, setArrProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cantProductos, setCantProductos] = useState(0);

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [shopAddress, setShopAddress] = useState('Las Araucarias 165, El Bosque, Chile');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const latDefault = -33.557169;
  const lngDefault = -70.675131;
  const [titularTarjeta, setTitularTarjeta] = useState('');
  const [tarjetaCredito, setTarjetaCredito] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const fetchProducts = async (userId) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/producto/getProductos/' + userId);
        let monto = 0;
        response.data.forEach(element => {
          if (element.cantidad > 0)
            monto += element.precio * element.cantidad;
        });
        setTotalAmount(monto);
        const productosConCantidad = response.data.filter(function (producto) {
          return producto.cantidad > 0;
        });
        setCantProductos(productosConCantidad.length);
        setArrProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const fetchCustomer = async (userId) => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/cliente/getCliente/' + userId);
        setNombreCompleto(response.data[0].nombreCompleto);
        setEmail(response.data[0].email);
        setCustomerAddress(response.data[0].direccion);
        setLat(response.data[0].lat);
        setLng(response.data[0].lng);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const idUsuario = 1; //simula sesion
    fetchProducts(idUsuario); // se debe llamar a la función desde adentro porque useeffect no es asincrono
    fetchCustomer(idUsuario);
  }, []);

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
    setShowAddress(true); // Mostrar el input de dirección cuando se elige una opción de entrega
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="maincontainer">

        <div class="container">
          <div class="py-5 text-center">

            <h2>Checkout</h2>

          </div>
          <div class="row">
            {/* Carro */}
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Carrito</span>
                <span class="badge badge-secondary badge-pill">{cantProductos}</span>
              </h4>
              <ul class="list-group mb-3">
                {
                  arrProducts.map((product) => {
                    if (product.cantidad > 0) {
                      return (
                        <li key={product.idProducto} class="list-group-item d-flex justify-content-between lh-condensed">
                          <div>
                            <h6 class="my-0">{product.nombreProducto}</h6>
                            <small class="text-muted">{product.descripcionProducto}</small>
                          </div>
                          <span class="text-muted">${formatSubtotal(product.precio)}<b>x</b>{product.cantidad}</span>
                        </li>
                      )
                    }
                  })
                }
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (CLP)</span>
                  <strong>${formatSubtotal(totalAmount)}</strong>
                </li>
              </ul>
              {/* <form class="card p-2">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Promo code" />
                <div class="input-group-append">
                  <button type="button" class="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form> */}
            </div>
            {/* Datos Checkout */}
            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">Datos Compra</h4>
              <form class="needs-validation" novalidate>
                <div class="row">
                  <div class="mb-3">
                    <label for="firstName">Nombre Completo</label>
                    <input type="text" class="form-control" id="firstName" disabled required value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>


                {/* Opciones de entrega */}
                <div className="mb-3">
                  <label>¿Cómo desea recibir su pedido?</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryOption"
                      value="domicilio"
                      checked={deliveryOption === 'domicilio'}
                      onChange={handleDeliveryOptionChange}
                    />
                    <label className="form-check-label">Entrega a domicilio</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="deliveryOption"
                      value="tienda"
                      checked={deliveryOption === 'tienda'}
                      onChange={handleDeliveryOptionChange}
                    />
                    <label className="form-check-label">Retiro en tienda</label>
                  </div>
                </div>

                {/* Dirección de entrega */}

                <div className="mb-3">
                  <label htmlFor="address">Dirección de entrega</label>
                  <input type="text" className="form-control" id="address" required value={deliveryOption === 'domicilio' ? customerAddress : shopAddress} disabled />
                  <div className="invalid-feedback">
                    Por favor ingrese su dirección de entrega.
                  </div>
                </div>
                <div style={{ height: 400, width: '100%' }}>

                  <Map center={{lat: deliveryOption === 'domicilio' ? lat : latDefault, lng: deliveryOption === 'domicilio' ? lng : lngDefault}} zoom={17}>
                    <Marker position={{lat: deliveryOption === 'domicilio' ? lat : latDefault, lng: deliveryOption === 'domicilio' ? lng : lngDefault}} />
                  </Map>

                </div>
                <hr className="mb-4" />

                <h4 class="mb-3">Pago</h4>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cc-name">Titular Tarjeta</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required value={titularTarjeta} onChange={(e) => setTitularTarjeta(e.target.value)} />
                    <small class="text-muted">Nombre completo escrito en la tarjeta</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cc-number">Tarjeta de Crédito</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required value={tarjetaCredito} onChange={(e) => setTarjetaCredito(e.target.value)} />
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">Expira</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
                <div class="col-md-12 mb-3">
                  <div class="d-flex justify-content-end">
                    <button className="btn btn-primary btn-lg" type="button">Finalizar Compra</button>
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
    </APIProvider>
  );
};

