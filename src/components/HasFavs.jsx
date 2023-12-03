import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const HasFavs = () => {

	const [favs, setFavs] = useState([]);
	useEffect(() => {
		let localFavs = JSON.parse(localStorage.getItem("npmFavs")) || [];
		setFavs(localFavs);
	}, [])

	const handleDelete = (name) => {
		const updatedFavs = favs.filter((fav) => fav.name !== name);
		setFavs(updatedFavs);
		localStorage.setItem("npmFavs", JSON.stringify(updatedFavs));

	};


	return (
		<div className="mx-10 mt-12">
			<div className='flex justify-between'>
				<h1 className="">Welcome to Favorite NPM Packages</h1>
				<Link to={"/addFavs"}>
					<button className="mx-36 mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 shadow-md transition-all duration-300">
						Add Favs
					</button></Link>
			</div>

			<table className="w-full mt-8">
				<thead>
					<tr>
						<th className="border px-4 py-2">Package Name</th>
						<th className="border px-4 py-2">Reason</th>
						<th className="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{favs.map((fav) => (
						<tr key={fav.name}>
							<td className="border px-4 py-2">{fav.name}</td>
							<td className="border px-4 py-2">{fav.reason}</td>
							<td className="border px-4 py-2">
								<button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700" disabled>
									Edit
								</button>
								<button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" disabled>
									View
								</button>
								<button
									className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
									onClick={() => handleDelete(fav.name)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>



		</div>
	)
}

export default HasFavs