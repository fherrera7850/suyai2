import React, { useState } from "react";
import registroImage from "../assets/logo_suyai.JPG";
import "./index.css";

export const Registro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellphone, setCellphone] = useState("");
  

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

  await fetch("http://192.168.100.22:4000/api/registro/registrarUsuario", {
    method: "POST",
    body: JSON.stringify(objUsuario),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      console.log("🚀 ~ .then ~ response:", response)
      
    })
    .catch((err) => console.log(err));
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
      <div className="formularioRegistro">
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
                <input type="number" id="telefono" placeholder="912345678" onChange={(e) => setCellphone(e.target.value)}/>
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
    </>
  );
};
