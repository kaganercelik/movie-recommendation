import React, { useContext, useState } from "react";
import { useEffect } from "react";
import {
	AiFillEdit,
	AiOutlineLike,
	AiFillLike,
	AiOutlineDislike,
	AiFillDislike,
} from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";

const Movie = ({ title, genre, image, year, imdb, id }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);
	const {
		isAdmin,
		setUpdateItemInfo,
		setDeleteItemInfo,
		setDislikedMovies,
		setLikedMovies,
		dislikedMovies,
		currentUser,
	} = useContext(MovieContext);

	const navigate = useNavigate();

	const changeLiked = () => {
		fetch("http://localhost:5000/rate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: currentUser.id,
				movieId: id,
				rating: 1,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
		setIsLiked(true);
		setIsDisliked(false);
	};

	useEffect(() => {
		console.log(`Disliked Movies : ${dislikedMovies}`);
	}, [dislikedMovies]);

	const handleUpdate = () => {
		setUpdateItemInfo({
			id: id,
			title: title,
			genre: genre,
			image: image,
			year: year,
			imdb: imdb,
		});
		navigate("/update-movie");
	};
	const handleDelete = () => {
		setDeleteItemInfo({
			title: title,
			genre: genre,
			image: image,
			year: year,
			imdb: imdb,
		});

		const search = new URLSearchParams({ id: id }).toString();

		const url = "http://localhost:5000/movie?" + search;

		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
		navigate("/");
	};

	const handleDislike = () => {
		console.log(`key: ${id}`);

		console.log(currentUser);

		fetch("http://localhost:5000/rate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: currentUser.id,
				movieId: id,
				rating: 0,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));

		setIsDisliked(true);
		setIsLiked(false);
	};

	return (
		<div className="card h-96 bg-base-100 shadow-xl hover:shadow-red-700 pb-20 mb-20 mx-2 w-60 relative">
			<figure className="h-3/5 min-w-full">
				<img
					src={image}
					alt="image not found"
					className="h-60 min-h-full min-w-full"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{genre}</p>className
				<div className="flex justify-space">
					<p>IMDB: {imdb}</p>
					<p>Year: {year}</p>
				</div>
				<div className="card-actions justify-end absolute bottom-3 right-3">
					{isLiked ? (
						<AiFillLike size="28px" color="#068f13" onClick={changeLiked} />
					) : (
						<AiOutlineLike size="28px" onClick={changeLiked} />
					)}
					{isDisliked ? (
						<AiFillDislike
							size="28px"
							color="#fc0703"
							onClick={handleDislike}
						/>
					) : (
						<AiOutlineDislike size="28px" onClick={handleDislike} />
					)}
					{isAdmin && (
						<AiFillEdit
							size="28px"
							onClick={handleUpdate}
							className="hover:text-amber-300"
						/>
					)}
					{isAdmin && (
						<MdDeleteForever
							size="28px"
							onClick={handleDelete}
							className="hover:text-red-800"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Movie;
