import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.token && store.token !== "" && store.token !== undefined) actions.getAuthorization()
	}, [store.token])

	return (
		<div className="text-center mt-5 container">
			<div className="row">
				{store.pets.map((pet) => {
					return (
						<div className="col-sm-12 col-md-6 col-lg-4 gy-5" >
							<div className="card" style={{ "width": "18rem" }}>
								<div className="card-body">
									<h5 className="card-title">{pet.name}</h5>
									<p className="card-text">Age: {pet.age}</p>
									<p className="card-text">Hello: {pet.hello}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			{/* <div className="row">
				{store.pets_by_id.map((pet) => {
					return (
						<div className="col-sm-12 col-md-6 col-lg-4 gy-5" >
							<div className="card" style={{ "width": "18rem" }}>
								<div className="card-body">
									<h5 className="card-title">{pet.name}</h5>
									<p className="card-text">Age: {pet.age}</p>
									<p className="card-text">Hello: {pet.hello}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div> */}
		</div >
	);
};
