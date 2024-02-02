import React, { useEffect, useState } from "react";
import "./cliente.css";
import { getCookie } from "../../utils/Cookie";
import axios from "axios";

export const CuentaC = () => {

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [puntosSuyai, setPuntosSuyai] = useState(0);
  const [habilitaEditar, setHabilitaEditar] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {

      await axios.get(process.env.REACT_APP_API_URL + `/cliente/getCliente/${getCookie('userId')}`)
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response.data)
          setNombreCompleto(response.data[0].nombreCompleto);
          setNombreUsuario(response.data[0].nombreUsuario);
          setPassword('******');
          setEmail(response.data[0].email);
          setAddress(response.data[0].direccion);
          setCellphone(response.data[0].telefono);
          setPuntosSuyai(response.data[0].puntosCliente);
        })
    }

    fetchUser();

  }, [])


  const actualizaUsuario = async () => {

    const url = process.env.REACT_APP_API_URL + `/cliente/updateCliente/${getCookie('userId')}`

    console.log("🚀 ~ actualizaUsuario ~ url:", url)
    const objBody = {
      nombreUsuario,
      passwordUsuario: password,
      nombreCompleto,
      email,
      direccion: address,
      telefono: cellphone
    }
    console.log("🚀 ~ actualizaUsuario ~ objBody:", JSON.stringify(objBody))

    await axios.put(url, objBody)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response)
        if (response.status === 200) {
          setHabilitaEditar(!habilitaEditar);
          alert("Cuenta actualizada exitosamente.");
        }
        else {
          alert("Se produjo un error al actualizar la cuenta. Error: " + response.status);
        }
      })
      .catch((error) => {
        alert("Error desconocido: " + error);
      })
  }

  if (getCookie('userId') > 0) {
    return (
      <>
        <h1 style={{ fontSize: 40, fontFamily: "sans-serif", textAlign: "center", color: "darkslategray" }}>Información de la cuenta</h1>

        <div className="infoCuenta">
          <table>
            <tr>
              <td>Nombre de usuario: </td>
              <td><input disabled={!habilitaEditar} type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Contraseña: </td>
              <td><input disabled={!habilitaEditar} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Nombre Completo: </td>
              <td><input disabled={!habilitaEditar} type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Email: </td>
              <td><input disabled={!habilitaEditar} type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Direccion: </td>
              <td><input disabled={!habilitaEditar} type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Telefono de contacto: </td>
              <td><input disabled={!habilitaEditar} type="text" value={cellphone} onChange={(e) => setCellphone(e.target.value)} /></td>
            </tr>
            <br />
            <tr>
              <td>Puntos Suyai: </td>
              <td><input disabled type="text" value={puntosSuyai} /></td>
            </tr>
            <br />
            <div className="botonesCuenta">
              <button className="btnEditar" onClick={() => setHabilitaEditar(!habilitaEditar)}>Editar</button>
              <button className="btnGuardar" onClick={actualizaUsuario}>Guardar</button>
            </div>

          </table>
        </div>
      </>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>NO AUTORIZADO</h1>
      </div>
    )
  }
};