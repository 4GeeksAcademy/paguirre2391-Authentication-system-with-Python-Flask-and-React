import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
<<<<<<< HEAD
					<span className="navbar-brand mb-0 h1"></span>
				</Link>
				
=======
					<span className="navbar-brand mb-0 h1">hola mundo</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">!</button>
					</Link>
				</div>
>>>>>>> 9b6dd05c3792799ed0f6cc54adab4ab57994b07f
			</div>
		</nav>
	);
};
