import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function PrivateProfile() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token actual:", store.jwt_token);
    if (store.jwt_token == null) {
      console.log("No se encontró un token, redirigiendo a /login...");
      alert("Por favor inicia sesión con tus credenciales de usuario");
      navigate("/loginpage");
      return;
    }
    actions.getProfile();
  }, [store.jwt_token]);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="container d-flex align-items-center justify-content-evenly flex-column">
        <h1>Demo Private Profile Info</h1>
       
        {store.user ? (
          <div className="d-flex align-items-center justify-content-center mt-3">
            <div className="container d-flex align-items-center justify-content-evenly flex-column">
              <h5>¡Bienvenido a tu demo de perfil privado!</h5>
              <h5>USER ID: {store.user.id}</h5>
              <h5>EMAIL: {store.user.email}</h5>
            </div>
          </div>
        ) : (
          <h5>Cargando información privada...</h5>
        )}
      </div>
    </div>
  );
}
