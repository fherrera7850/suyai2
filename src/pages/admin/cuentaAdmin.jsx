import React from "react";

export const CuentaA = () => {
  return (
    <> 
      <h1>Información de la cuenta</h1>

      <table>
        <ul>
            <label>Nombre: </label>
            <input type="text" disabled={true}/>
            <br />

            <label>Dirección: </label>
            <input type="text" disabled={true} />
            <br />

            <label>Número de telefono: </label>
            <input type="number" disabled={true}/>
            <br />

            <label>Correo: </label>
            <input type="email" disabled={true}/>
            <br />

            <label>Nombre de usuario: </label>
            <input type="text" disabled={true}/>
            <br />

            <label>Contraseña: </label>
            <input type="password" disabled={true}/>
            <br />

            <button>Editar información de la cuenta</button>
            <br />
            <button>Guardar información de la cuenta</button>
        </ul>
      </table>
    </>
  );
   
};