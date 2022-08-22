import { useEffect, useRef, useState } from "react";

import { useLocation } from "react-router-dom";

import Movie from "./Movie";

const ShowMovies = () => {
	const [movies, setMovies] = useState([]);
	const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
	const [counter, setCounter] = useState();
	const [action, setAction] = useState([]);
	const [animation, setAnimation] = useState([]);
	const [comedy, setComedy] = useState([]);
	const [drama, setDrama] = useState([]);
	const [fantasy, setFantasy] = useState([]);
	const [horror, setHorror] = useState([]);
	const [mystery, setMystery] = useState([]);
	const [romance, setRomance] = useState([]);
	const movieRef = useRef();
	const buttonRef = useRef();
	const location = useLocation();

	const getMovies = async () => {
		let response = await fetch("http://localhost:5000/getAllMovies", {
			method: "GET",
			header: {
				"Content-Type": "application/json",
			},
		});

		let data = await response.json();
		data = data.movies;

		data.forEach((item) => {
			const search = new URLSearchParams({ fileName: item.image }).toString();

			const url = "http://localhost:5000/get_image?" + search;

			setMovies((prevState) => [
				...prevState,
				{
					id: item.id,
					genre: item.genre,
					image: url,
					imdb: item.imdb,
					title: item.title,
					year: item.year,
				},
			]);
		});

		setIsMoviesLoaded((prevState) => !prevState);
	};

	const orderMovies = () => {
		const dummy = movies;

		// dummy.sort((a, b) => (a.genre > b.genre ? 1 : b.genre > a.genre ? -1 : 0));

		setAction(dummy.filter((movie) => movie.genre.toLowerCase() === "action"));
		setAnimation(
			dummy.filter((movie) => movie.genre.toLowerCase() === "animation")
		);
		setComedy(dummy.filter((movie) => movie.genre.toLowerCase() === "comedy"));
		setDrama(dummy.filter((movie) => movie.genre.toLowerCase() === "drama"));
		setFantasy(
			dummy.filter((movie) => movie.genre.toLowerCase() === "fantasy")
		);
		setHorror(dummy.filter((movie) => movie.genre.toLowerCase() === "horror"));
		setMystery(
			dummy.filter((movie) => movie.genre.toLowerCase() === "mystery")
		);
		setRomance(
			dummy.filter((movie) => movie.genre.toLowerCase() === "romance")
		);
	};

	const changeButton = () => {
		const idOfButton = location.hash.substring(1);
		const child = buttonRef.current.children;

		for (let i = 0; i < child.length; i++) {
			if (child[i].href.split("#")[1] === idOfButton) {
				child[i].className = "btn glass rounded-full";
			} else {
				child[i].className = "btn btn-ghost rounded-full";
			}
		}
	};

	useEffect(() => {
		isMoviesLoaded === false ? getMovies() : orderMovies();
		isMoviesLoaded === true && changeButton();
	}, [movies, location]);

	return (
		<div id="show-movie">
			<div className="flex justify-center sticky top-5 z-10">
				<div
					className="flex justify-center gap-3  bg-red-50/[0.3]  max-w-fit rounded-full p-2"
					id="sticky-navbar"
					ref={buttonRef}
				>
					<a href="#action" className="btn btn-ghost rounded-full ">
						<p className="text-red-500">Action</p>
					</a>
					<a href="#animation" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Animation </p>
					</a>
					<a href="#comedy" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Comedy</p>
					</a>
					<a href="#drama" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Drama</p>
					</a>
					<a href="#fantasy" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Fantasy</p>
					</a>
					<a href="#horror" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Horror</p>
					</a>
					<a href="#mystery" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Mystery</p>
					</a>
					<a href="#romance" className="btn btn-ghost rounded-full">
						<p className="text-red-500">Romance</p>
					</a>
				</div>
			</div>
			<div ref={movieRef}>
				<div id="action">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5 mt-5">
						{action.map((movie, index) => (
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
				<div id="animation">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{animation.map((movie, index) => (
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
				<div id="comedy">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{comedy.map((movie, index) => (
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
				<div id="drama">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{drama.map((movie, index) => (
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
				<div className="fantasy">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{fantasy.map((movie, index) => (
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
				<div id="horror">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{horror.map((movie, index) => (
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
				<div id="mystery">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{mystery.map((movie, index) => (
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
				<div id="romance">
					<div className=" grid grid-cols-7 gap-3 md:grid-cols-5">
						{romance.map((movie, index) => (
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
			</div>
		</div>
	);
};

export default ShowMovies;
