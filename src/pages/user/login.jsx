import React, { useState } from "react";
import loginImage from "./../../assets/logo_suyai.JPG";
import "../index.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUsuario = async () => {
    const objUsuario = {
      nombreUsuario: username,
      passwordUsuario: password,
    };
  
    try {
      const response = await fetch(
        "http://192.168.100.22:4000/api/login/loginUsuario",
        {
          method: "POST",
          body: JSON.stringify(objUsuario),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
  
      console.log("🚀 ~ response:", response);
  
      if (response.status === 200) {
        const data = await response.json();
        // Ahora, data es el resultado del parsing del JSON
        //const abreviacionRol = data[0].abreviacionRol;
        //console.log("🚀 ~ abreviacionRol:", abreviacionRol);
  
        switch (response.status) {
          case 200:
            alert("login exitoso");
            break;
          case 204:
            alert("contraseña incorrecta");
            break;
          default:
            alert("error");
            break;
        }
      } else {
        alert("error en la solicitud");
      }
    } catch (error) {
      console.log("🚀 catch error:", error);
      alert("error en la solicitud");
    }
  };
  

  return (
    <>
      <h1
        className="tituloLogin"
        style={{ fontSize: 40, fontFamily: "sans-serif" }}
      >
        Inicio de sesión
      </h1>
      <br />
      <div className="formularioLogin">
        <table>
          <tbody>
            <tr>
              <td>
                <img src={loginImage} alt="Login" className="loginImage" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="txtNombreUsuario">Nombre de usuario: </label>
              </td>
              <td>
                <input
                  type="text"
                  id="txtNombreUsuario"
                  placeholder="pepito1998"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="txtContraseña">Contraseña: </label>
              </td>
              <td>
                <input
                  type="password"
                  id="txtContraseña"
                  placeholder="*************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={loginUsuario} className="btnLogin">
                  Iniciar Sesión
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
