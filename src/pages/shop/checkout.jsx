import React, { useState } from 'react';
import './styles/Checkout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Checkout = () => {

  const [deliveryOption, setDeliveryOption] = useState('');
  const [showAddress, setShowAddress] = useState(false);

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
    setShowAddress(true); // Mostrar el input de dirección cuando se elige una opción de entrega
  };

  return (
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
              <span class="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul class="list-group mb-3">

              {/* {PRODUCTS.map((product) => {
               

              })} */}
              {/* <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Product name</h6>
                    <small class="text-muted">Brief description</small>
                  </div>
                  <span class="text-muted">$12</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Second product</h6>
                    <small class="text-muted">Brief description</small>
                  </div>
                  <span class="text-muted">$8</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Third item</h6>
                    <small class="text-muted">Brief description</small>
                  </div>
                  <span class="text-muted">$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span class="text-success">-$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$20</strong>
                </li> */}
            </ul>
            <form class="card p-2">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Promo code" />
                <div class="input-group-append">
                  <button type="button" class="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form>
          </div>
          {/* Datos Checkout */}
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Datos Compra</h4>
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="mb-3">
                  <label for="firstName">Nombre</label>
                  <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" />
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
              {showAddress && (
                <div className="mb-3">
                  <label htmlFor="address">Dirección de entrega</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                  <div className="invalid-feedback">
                    Por favor ingrese su dirección de entrega.
                  </div>
                </div>
              )}
              <hr className="mb-4" />

              <h4 class="mb-3">Payment</h4>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cc-name">Name on card</label>
                  <input type="text" class="form-control" id="cc-name" placeholder="" required />
                  <small class="text-muted">Full name as displayed on card</small>
                  <div class="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cc-number">Credit card number</label>
                  <input type="text" class="form-control" id="cc-number" placeholder="" required />
                  <div class="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">Expiration</label>
                  <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                  <div class="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">CVV</label>
                  <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                  <div class="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <hr class="mb-4" />
              <button class="btn btn-primary btn-lg btn-block" type="button">Continue to checkout</button>
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

