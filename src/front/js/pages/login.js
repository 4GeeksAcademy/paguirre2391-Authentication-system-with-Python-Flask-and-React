import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleClick = async () => {
		await actions.login(email, password)
		navigate('/');

	}


	return (
		<div className="text-center mt-5 container">
			<h1>Login</h1>
			{(store.token && store.token !== "" && store.token !== undefined) ? "You're logged in with this token: " + store.token : (
				<div className="m-5">
					<input className="m-1" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="m-1" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button className="m-1" onClick={handleClick}>Login</button>
				</div>
			)}
		</div >
	);
};
