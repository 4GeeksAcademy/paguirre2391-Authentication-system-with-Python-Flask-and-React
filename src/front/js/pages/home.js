import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight:"85vh"}}>
            <div className="container d-flex align-items-center justify-content-evenly flex-column">
                
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <h5 className="m-3">¿Eres nuevo en la plataforma?</h5>
                    <Link to="/singup">
                        <button type="button" className="btn btn-dark">Registrar Nuevo Usuario</button>
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <h5 className="m-3">¿Ya tienes una cuenta?</h5>
                    <Link to="/loginpage">
                        <button type="button" className="btn btn-dark">Iniciar Sesión</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
