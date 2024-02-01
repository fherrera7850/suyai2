import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import PedidosCliente from "./pages/cliente/pedidosCliente";
import { CuentaC } from "./pages/cliente/cuentaCliente";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Registro } from "./pages/registroUsuario";
import { Login } from "./pages/user/login";
import { Checkout } from "./pages/shop/checkout";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cliente/pedidosCliente" element={<PedidosCliente />} />
            <Route path="/cliente/cuentaCliente" element={<CuentaC />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/registroUsuario" element={<Registro />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
