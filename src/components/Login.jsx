import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useRef } from "react";
import MovieContext from "../context/MovieContext.js";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const navigate = useNavigate(); // change this later to movie list

	const {
		currentUser,
		setCurrentUser,
		setIsAdmin,
		handleIsAdmin,
		handleLogin,
	} = useContext(MovieContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		fetch("http://localhost:5000/login", {
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
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success === false) {
					setError(true);
				} else {
					setError(false);
					setIsAdmin(() => (data.isAdmin === 0 ? false : true));
					setCurrentUser({ ...data });
					navigate("/");
				}
			})
			.catch((err) => console.error(err.message));
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 gap-4 w-3/12 mt-32"
			>
				{error && <div>Invalid Email or Password</div>}
				<label className="input-group w-full">
					<span className="w-2/5 flex justify-center">Email</span>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="example@example.com"
						className="input input-bordered w-3/5"
					/>
				</label>
				<label className="input-group w-full">
					<span className="w-2/5 flex justify-center">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="*******"
						className="input input-bordered w-3/5"
					/>
				</label>
				{currentUser ? (
					<p> Logged in successfully!</p>
				) : (
					<div className="flex justify-center">
						<Link to="/register" className="btn btn-outline btn-secondary mx-3">
							Register
						</Link>

						<button
							type="submit"
							className="btn btn-outline btn-secondary mx-3"
						>
							Login
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default Login;
