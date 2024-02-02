import React, { useState } from "react";
import registroImage from "../assets/logo_suyai.JPG";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./../context/AuthContext";
import { setCookie } from "../utils/Cookie";

export const Registro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellphone, setCellphone] = useState("");

  const { setUserId, userId, setIsLoggedIn, isLoggedIn } = useAuth();

  async function registrarUsuario() {

    const objUsuario = {
      idRol: 3,
      nombreUsuario: username,
      passwordUsuario: password,
      nombreCompleto: fullName,
      email: email,
      direccion: address,
      telefono: cellphone,
      activo: 1,
    };
    console.log(
      "🚀 ~ registrarUsuario ~ objUsuario:",
      JSON.stringify(objUsuario)
    );

    if (!username || !password || !fullName || !email || !address || !cellphone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    await axios.post(process.env.REACT_APP_API_URL + '/registro/registrarUsuario', objUsuario)
      .then(response => {
        console.log("🚀 ~ registrarUsuario ~ response:", response)
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserId(response.data); 
          setCookie('userId', response.data, 7);
          setCookie('rol', 'c', 7);
          window.alert('Usuario registrado exitosamente');
          window.location.href = '/';
        }
      })
      .catch(error => {
        console.error("🚀 ~ registrarUsuario ~ error:", error.response.status)
        if (error.response.status === 403) {
          alert("El usuario ya existe");
        }
        else if (error.response.status === 400) {
          alert("Solicitud incompleta.");
        }
        else {
          alert("Error desconocido al registrar usuario");
        }
      })

  };



  return (
    <>
      <h1
        className="tituloRegistro"
        style={{ fontSize: 40, fontFamily: "sans-serif" }}
      >
        Registro de usuario
      </h1>
      <br />
      <div className="formularioRegistro" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <table>
          <tr>
            <td>
              <img
                src={registroImage}
                alt="Registro"
                className="registroImage"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Nombre de usuario: </label>
            </td>
            <td>
              <input
                type="text"
                id="txtNombreUsuario"
                placeholder="Ejemplo: pepito1998"
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Contraseña: </label>
            </td>
            <td>
              <input
                type="password"
                id="txtContraseña"
                placeholder="*************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Nombre y apellido: </label>
            </td>
            <td>
              <input
                type="text"
                id="txtNombreCompleto"
                placeholder="Juanito Yañez Herrera"
                onChange={(e) => setFullName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Correo electrónico: </label>
            </td>
            <td>
              <input
                type="email"
                id="txtEmail"
                placeholder="pepito1234@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Dirección: </label>
            </td>
            <td>
              <input
                type="text"
                id="txtDireccion"
                placeholder="Galvarino 111, El Bosque"
                onChange={(e) => setAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Teléfono de contacto: </label>
            </td>
            <td>
              <input type="number" id="telefono" placeholder="912345678" onChange={(e) => setCellphone(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={registrarUsuario} className="btnRegistrar">
                Registrarme
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }} >
        <hr style={{ width: "30%" }} />
      </div>
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }} >
        <p style={{ fontSize: 20, fontFamily: "sans-serif" }}>Ya tienes una cuenta? Inicia sesión <Link to="/user/login" className="linkLogin">aquí	</Link></p>
      </div>
    </>
  );
};
