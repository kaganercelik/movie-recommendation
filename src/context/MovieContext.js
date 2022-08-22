import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { collection, getDocs, query } from "firebase/firestore";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [updateItemInfo, setUpdateItemInfo] = useState({});
	const [deleteItemInfo, setDeleteItemInfo] = useState({});
	const [likedMovies, setLikedMovies] = useState([]);
	const [dislikedMovies, setDislikedMovies] = useState([]);

	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user" || null))
	);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	const handleIsAdmin = (email, password) => {
		fetch("http://localhost:5000/admin/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((res) => setIsAdmin(res))
			.catch((err) => console.error(err.message));
	};

	return (
		<MovieContext.Provider
			value={{
				isAdmin,
				currentUser,
				updateItemInfo,
				deleteItemInfo,
				likedMovies,
				dislikedMovies,
				setLikedMovies,
				setDislikedMovies,
				handleIsAdmin,
				setDeleteItemInfo,
				setUpdateItemInfo,
				setCurrentUser,
				setIsAdmin,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieContext;
