import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieContext from "../context/MovieContext";
import Movie from "./Movie";

const Advice = () => {
	const { currentUser } = useContext(MovieContext);
	const [advisedMovies, setAdvisedMovies] = useState([]);

	const getAdvisedMovies = () => {
		const search = new URLSearchParams({ id: currentUser.id }).toString();

		const url = "http://localhost:5000/getSuggestion?" + search;

		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				data.suggestions.movies.forEach(({ movieId }) => {
					const search = new URLSearchParams({ id: movieId }).toString();

					const url = "http://localhost:5000/movie?" + search;

					fetch(url, {
						method: "GET",
						headers: { "Content-Type": "application/json" },
					})
						.then((res) => res.json())
						.then((data) => {
							console.log(data);
							setAdvisedMovies((prevState) => [
								...prevState,
								{
									id: data.id,
									genre: data.genre,
									image: `http://localhost:5000/get_image?fileName=${data.image}`,
									imdb: data.imdb,
									title: data.title,
									year: data.year,
								},
							]);
						});
				});
			});
	};

	useEffect(() => {
		getAdvisedMovies();
	}, []);

	return (
		<>
			<div>
				<div className=" grid grid-cols-7 gap-3 md:grid-cols-5 mt-5">
					{advisedMovies.map((movie, index) => (
						<Movie
							title={movie.title}
							genre={movie.genre}
							image={movie.image}
							year={movie.year}
							imdb={movie.imdb}
							id={movie.id}
							key={index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Advice;
