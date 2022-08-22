import React, { useContext, useState } from "react";
import AddMovie from "../components/AdminPanel/AddMovie";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import DeleteMovie from "../components/AdminPanel/DeleteMovie";
import { useNavigate } from "react-router-dom";
import ShowMovies from "../components/ShowMovies";

const AdminPanel = () => {
	const [showAdd, setShowAdd] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="card grid grid-cols-1 gap-4 content-center">
			{showAdd === false ? (
				<div className="flex justify-center">
					<div
						className="badge badge-lg badge-primary p-6 "
						onClick={() => setShowAdd((prevState) => !prevState)}
					>
						<p className="fs-5">Add Movie</p>
						<IoAddCircleOutline
							className="fs-1 "
							style={{ width: "36px", height: "36px" }}
						/>
					</div>
				</div>
			) : (
				<div className="w-50 d-flex justify-content-center">
					<AddMovie setShowAdd={setShowAdd} />
				</div>
			)}

			{showUpdate === false ? (
				<div className="flex justify-center">
					<div
						className="badge badge-lg badge-primary p-6 "
						onClick={() => {
							navigate("/");
						}}
					>
						<p className="fs-5">Update Movie</p>

						<AiFillDelete className="fs-1" />
					</div>
				</div>
			) : (
				<div className="w-50 d-flex justify-content-center">
					<ShowMovies onClick={() => navigate("/")} />
				</div>
			)}

			{showDelete === false ? (
				<div className="flex justify-center">
					<div
						className="badge badge-lg badge-primary p-6"
						onClick={() => navigate("/")}
					>
						<p className="fs-5">Delete Movie</p>

						<AiFillDelete className="fs-1 " />
					</div>
				</div>
			) : (
				<div className="w-50  d-flex justify-content-center ">
					<DeleteMovie setShowDelete={setShowDelete} />
				</div>
			)}
		</div>
	);
};

export default AdminPanel;
