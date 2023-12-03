import React from 'react'
import { Link } from 'react-router-dom'
import AddFavs from './AddFavs'

const NoFavs = () => {
	return (
		<div className="mx-10 mt-12">
			<h1 className="">Welcome to Favorite NPM Packages</h1>
			<div className="border-4 border-gray-400 p-6 mx-auto h-96 flex flex-col justify-center items-center">
				<p className='text-xl'>You don't have any Favs yet. Please Add</p>
				<Link to="/addFavs">
					<button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
						Add Fav
					</button>
				</Link>
			</div>
		</div>
	)
}

export default NoFavs