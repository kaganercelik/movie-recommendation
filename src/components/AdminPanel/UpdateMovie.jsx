import React, { useContext, useEffect, useState } from "react";
import MovieContext from "../../context/MovieContext";

import { useNavigate } from "react-router-dom";
import Movie from "../Movie";

const UpdateMovie = () => {
	const [title, setTitle] = useState("");
	const [id, setId] = useState("");
	const [genre, setGenre] = useState("");
	const [year, setYear] = useState(0);
	const [file, setFile] = useState(null);
	const [image, setImage] = useState("");
	const [imdb, setImdb] = useState();

	const [docId, setDocId] = useState();
	const [rendered, setRendered] = useState(true);
	const [isReady, setIsReady] = useState(false);
	const { updateItemInfo } = useContext(MovieContext);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const data = {
			id:id,
			title: title,
			genre: genre,
			year: year,
			imdb: imdb,
		};	
	
		
		const search = new URLSearchParams(data).toString();
	
		const url = "http://localhost:5000/movie?" + search;

		const formData = new FormData();
		formData.append("image", image);
		
		console.log(formData.get("image"));
		fetch(url, {
			method: "PUT",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {console.log(data);navigate("/");});

		
	};

	const getDocId = async () => {
	

		
	};
	const uploadFile = () => {
		

		// Upload file and metadata to the object 'images/mountains.jpg'
		

		
	};
	useEffect(() => {
		!docId && getDocId();
		file && uploadFile();
		if (rendered) {
			setTitle(updateItemInfo.title);
			setId(updateItemInfo.id);
			setGenre(updateItemInfo.genre);
			setYear(updateItemInfo.year);
			setImage(updateItemInfo.image);
			setImdb(updateItemInfo.imdb);
			setRendered(false);
		}
	}, [file]);

	return (
		<div className="grid grid-cols-1 gap-4 place-content-center">
			<div className="max-w-lg m-auto">
				<Movie
					title={title}
					genre={genre}
					image={image}
					year={year}
					imdb={imdb}
				/>
			</div>

			<div className="flex justify-center ">
				<div className="card w-96 bg-base-100 shadow-xl card-bordered border-red-200 hover:shadow-red-200 w-2/6">
					<div className="card-body mx-10 p-5">
						<form onSubmit={handleSubmit} className="card gap-4">
							<label className="input-group">
								<span className="w-1/4">Title</span>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-3/4 input input-primary input-bordered"
								></input>
							</label>
							<label className="input-group">
								<span className="w-1/4">Genre</span>
								<select
									className="select w-3/4 input-bordered input-primary"
									value={genre}
									onChange={(e) => setGenre(e.target.value)}
								>
									<option disable selected>
										Pick a Genre
									</option>
									<option>Action</option>
									<option>Animation</option>
									<option>Comedy</option>
									<option>Drama</option>
									<option>Fantasy</option>
									<option>Horror</option>
									<option>Mystery</option>
									<option>Romance</option>
								</select>
							</label>
							<label className="input-group">
								<span className="w-1/4">Year</span>
								<input
									type="number"
									value={year}
									onChange={(e) => setYear(e.target.value)}
									className="w-3/4 input input-primary input-bordered"
								></input>
							</label>
							<label className="input-group">
								<span className="w-1/4">IMDB</span>
								<input
									type="number"
									value={imdb}
									onChange={(e) => setImdb(e.target.value)}
									className="w-3/4 input input-primary input-bordered"
								></input>
							</label>
							<label className="input-group">
								<span className="w-1/4">Image</span>
								<input
									type="file"
									onChange={(e) => setFile(e.target.files[0])}
								></input>
							</label>

							<div className="flex justify-center">
							
									<button
										type="submit"
										value={file}
										className="btn-grad mt-3 hover:text-red-200"
									>
										Submit
									</button>
							
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateMovie;
