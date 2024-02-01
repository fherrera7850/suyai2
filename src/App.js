import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { PedidosC } from "./pages/cliente/pedidosCliente";
import { CuentaC } from "./pages/cliente/cuentaCliente";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Registro } from "./pages/registroUsuario";
import { Login } from "./pages/user/login";
import { Checkout } from "./pages/checkout/checkout";
import { Success } from "./pages/checkout/Success";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cliente/pedidosCliente" element={<PedidosC />} />
            <Route path="/cliente/cuentaCliente" element={<CuentaC />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/registroUsuario" element={<Registro />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
