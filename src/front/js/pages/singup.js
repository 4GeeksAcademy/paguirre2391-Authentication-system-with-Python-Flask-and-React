import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Singup() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginEmail = event.target.elements.useremail.value;
    const loginPassword = event.target.elements.userpassword.value;

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/register", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Usuario registrado exitosamente");
        const body = await response.json();
        console.log(body);
        actions.setToken(body.jwt_token);
        navigate("/private");
      } else {
        alert("Error al registrar usuario");
        throw new Error(response.status);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (store.jwt_token) {
      navigate("/private");
    }
  }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center flex-column" style={{ minHeight: "85vh" }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">
            Correo electrónico
          </label>
          <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" id="loginPassword" required />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-dark"onClick={() => navigate("/privateprofile")}>
            Registrarse
          </button>
          <div style={{ marginLeft: '10px' }}></div>
          <button className="btn btn-dark" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
