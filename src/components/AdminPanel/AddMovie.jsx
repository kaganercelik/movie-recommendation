import React, { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { auth, db, storage } from "../../firebase-config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GiCrossMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const AddMovie = ({ setShowAdd }) => {
	const [title, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [year, setYear] = useState(0);
	const [file, setFile] = useState(null);
	const [image, setImage] = useState("");
	const [imdb, setImdb] = useState();

	const navigate = useNavigate();

	const uploadFile = () => {
		console.log(file);
	};

	useEffect(() => {
		file && uploadFile();
	}, [file]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			title: title,
			genre: genre,
			year: year,
			imdb: imdb,
		};

		const search = new URLSearchParams(data).toString();

		const url = "http://localhost:5000/movie?" + search;

		const formData = new FormData();
		formData.append("image", image);

		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => console.log(data));

		navigate("/");
	};

	return (
		<div className="flex justify-center">
			<div className="card w-96 bg-base-100 shadow-xl card-bordered border-red-200 hover:shadow-red-200 w-2/6 transition-shadow duration-500">
				<div className="card-title justify-end">
					<GiCrossMark
						style={{ width: "50px", height: "24px" }}
						className="mt-5"
						onClick={() => setShowAdd((prevState) => !prevState)}
					/>
				</div>
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
								className="select w-3/4"
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
								min="0"
								onChange={(e) => setYear(e.target.value)}
								className="w-3/4 input input-primary input-bordered"
							></input>
						</label>
						<label className="input-group">
							<span className="w-1/4">IMDB</span>
							<input
								type="number"
								min="1"
								max="10"
								value={imdb}
								onChange={(e) => setImdb(e.target.value)}
								className="w-3/4 input input-primary input-bordered"
							></input>
						</label>
						<label className="input-group">
							<span className="w-1/4">Image</span>
							<input
								type="file"
								onChange={(e) => setImage(e.target.files[0])}
								className="form-control"
							/>
							{/* {file && (
								<span class="avatar">
									<div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
										<img src={image} />
									</div>
								</span>
							)} */}
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

		// Title, Genre, Year, Picture,
	);
};

export default AddMovie;
