import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import Movie from "../Movie";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const DeleteMovie = () => {
	const { deleteItemInfo } = useContext(MovieContext);
	const [docId, setDocId] = useState();
	const navigate = useNavigate();

	const getDocId = async () => {
		const colRef = collection(db, "movies");
		const docsSnap = await getDocs(colRef);

		docsSnap.forEach((doc) => {
			doc.data().image === deleteItemInfo.image && setDocId(doc.id);
		});
	};

	useEffect(() => {
		getDocId();
	}, []);

	const handleDelete = async () => {
		await deleteDoc(doc(db, "movies", docId));
		navigate("/");
	};
	return (
		<div className="flex justify-center">
			<div>
				<Movie
					title={deleteItemInfo.title}
					genre={deleteItemInfo.genre}
					image={deleteItemInfo.image}
					year={deleteItemInfo.year}
					imdb={deleteItemInfo.imdb}
				/>
				<div>
					<p className="alert alert-warning mt-5">
						Avengers movie will be deleted. Are you sure ?
					</p>
					<div className="flex justify-center mt-5">
						<button className="btn btn-success mx-3" onClick={handleDelete}>
							Yes
						</button>
						<button
							className="btn btn-error mx-3"
							onClick={() => navigate("/")}
						>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteMovie;
