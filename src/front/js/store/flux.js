const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			pets: [],

		},
		actions: {
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token")
				console.log("Application loaded, synching the local storage")
				if (token && token !== "" && token !== undefined) setStore({ token: token })
			},

			logout: () => {
				localStorage.removeItem("token")
				console.log("Login out")
				setStore({ token: null })
			},
			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/token", opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false
					}

					const data = await resp.json()
					console.log("This came from the backend", data)
					localStorage.setItem("token", data.access_token)
					setStore({ token: data.access_token })
					return true
				}
				catch (error) {
					console.log("There was an error!!!", error)
				}
			},
			getAuthorization: () => {
				const opts = {
					headers: {
						"Authorization": "Bearer " + getStore().token
					}
				}
				try {
					const response = fetch(process.env.BACKEND_URL + "api/private", opts)
					const data = response.json()
					console.log("This authorization came from the backend", data)
					setStore({ message: data.message })
					return true
				}
				catch (error) {
					console.log("There was an error!!!", error)
				}
			},
			getAllPets: async () => {
				const response = await fetch(process.env.BACKEND_URL + "api/pets")
				const data = await response.json()
				setStore({ pets: data.pets })
				// here we put 'data.pets' because that's what we wrote in the api.route for get_all_pets
				//when we do a fetch, and the status is not ok, the first thing is to check the URL and check the response with insomnia!!!
			},


		}
	};
};

export default getState;
