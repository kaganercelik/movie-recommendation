import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

const Navbar = () => {
	const { isAdmin, currentUser, setCurrentUser } = useContext(MovieContext);

	const handleLogout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error.message);
		}

		setCurrentUser(null);
	};

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					Movie AI
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li className="mx-3">
						<Link to="/">Home</Link>
					</li>
					<li className="mx-3">
						<Link to="/">Genre</Link>
					</li>

					<li className="mx-3">
						<Link to="/">Year</Link>
					</li>
					<li className="mx-3">
						<Link to="/">IMDB</Link>
					</li>

					{isAdmin && (
						<li className="mx-3">
							<Link to="/admin-panel">Admin Panel</Link>
						</li>
					)}

					{currentUser && (
						<li className="max-3 flex">
							<button onClick={handleLogout} className="btn btn-grad">
								Logout
							</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
