import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShowMovies from "../components/ShowMovies";
import MovieContext from "../context/MovieContext";

const Home = () => {
	const { isAdmin } = useContext(MovieContext);

	return (
		<div
			className="min-h-fit d-flex justify-content-center fs-1 align-items-center home pl-20 "
			style={{ height: "100%" }}
		>
			{!isAdmin && (
				<Link to="/advise" className="btn btn-primary hover:btn-ghost mt-3">
					Advice
				</Link>
			)}
			<ShowMovies className="mt-100" />
		</div>
	);
};

export default Home;
