import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para la navegación programática
import { Context } from "../store/appContext"; // Importa el contexto y las acciones de la aplicación

export function LoginPage() {
  const { store, actions } = useContext(Context); // Obtiene el estado y las acciones del contexto de la aplicación
  const navigate = useNavigate(); // Obtiene la función de navegación

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtiene el correo electrónico y la contraseña del formulario
    const loginEmail = event.target.elements.loginEmail.value;
    const loginPassword = event.target.elements.loginPassword.value;

    // Crea un objeto con los datos de inicio de sesión
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      // Envía los datos de inicio de sesión al servidor
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si la respuesta es exitosa (código 200)
      if (response.status === 200) {
        alert("Se ha iniciado sesión satisfactoriamente"); // Muestra una alerta de éxito
        const body = await response.json(); // Obtiene el cuerpo de la respuesta como JSON
        actions.setToken(body.jwt_token); // Almacena el token de autenticación en el estado global
        navigate("/privateprofile"); // Redirige al usuario a la página de perfil privado
      } 
      // Si la respuesta es un error de datos incorrectos (código 400)
      else if (response.status === 400) {
        alert("Se produjo un error al iniciar sesión: datos incorrectos"); // Muestra una alerta de error
        throw new Error(response.status); // Lanza un error
      } 
      // Si la respuesta es cualquier otro error
      else {
        alert("Se produjo un error al iniciar sesión"); // Muestra una alerta de error
        throw new Error(response.status); // Lanza un error
      }
    } catch (error) {
      console.log("Estatus de error: ", error); // Registra el error en la consola
    }
  };

  // Efecto secundario para verificar si el usuario ya está autenticado
  useEffect(() => {
    // Si el token de autenticación existe en el estado global, redirige al usuario a la página privada
    if (store.jwt_token) navigate("/private");
  }, []);

  // Renderiza el formulario de inicio de sesión
  return (
    <div className="container d-flex align-items-center justify-content-center flex-column" style={{ minHeight: "85vh" }}>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="loginPassword" required autoComplete="current-password"/>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-dark">Iniciar Sesión</button>
          <div style={{ marginLeft: '10px' }}></div>
          <button className="btn btn-dark" onClick={() => navigate("/")}>Volver</button>
        </div>
      </form>
    </div>
  );
}
