import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import Register from "./components/Register";

import Home from "./pages/Home";
import { useContext } from "react";
import MovieContext from "./context/MovieContext";
import ShowMovies from "./components/ShowMovies";
import UpdateMovie from "./components/AdminPanel/UpdateMovie";
import DeleteMovie from "./components/AdminPanel/DeleteMovie";
import Advice from "./components/Advice";

function App() {
	const { isAdmin, currentUser } = useContext(MovieContext);

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	return (
		<>
			<Router>
				<Navbar />

				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route
						exact
						path="/"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>

					<Route
						exact
						path="/admin-panel"
						element={<RequireAuth>{isAdmin && <AdminPanel />}</RequireAuth>}
					/>
					<Route
						exact
						path="/update-movie"
						element={<RequireAuth>{isAdmin && <UpdateMovie />}</RequireAuth>}
					/>
					<Route
						exact
						path="/delete-movie"
						element={<RequireAuth>{isAdmin && <DeleteMovie />}</RequireAuth>}
					/>

					<Route exact path="/advise" element={<Advice />} />

					<Route exact path="/register" element={<Register />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
