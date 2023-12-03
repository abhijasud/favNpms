import React, { useCallback } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddFavs = () => {

	const [selectedOption, setSelectedOption] = useState(null);
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [whyFav, setWhyFav] = useState("");
	const [toast, setToast] = useState({ show: false, message: "" });

	let localFavs = JSON.parse(localStorage.getItem("npmFavs")) || [];

	const debounce = (func) => {
		let timer;
		return function (...args) {
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 500);
		}
	}

	const handleInputChange = (event) => {

		console.log(data);

		const value = event.target.value;
		if (value != "") {
			fetch(`https://api.npms.io/v2/search?q=${value}`)
				.then(res => res.json())
				.then(json => setData(json.results));
		}

	}

	const debounced = useCallback(debounce(handleInputChange));

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		console.log(option);
	}

	const handleWhyFavChange = (event) => {
		setWhyFav(event.target.value);
	};

	const handleSubmit = () => {
		// Add logic to handle form submission
		const isOptionAlreadyPresent = localFavs.some((fav) => fav.name === selectedOption);

		if (!isOptionAlreadyPresent) {
			const newFav = { name: selectedOption, reason: whyFav };
			localFavs = [...localFavs, newFav];
			localStorage.setItem("npmFavs", JSON.stringify(localFavs));

			setToast({ show: true, message: "Package added to favorites!", type: "success" });

			setSelectedOption(null);
			setWhyFav("");
		} else {
			setToast({ show: true, message: "The selected package is already in your favorites list.", type: "error" });
		}
	};
	const handleToastClose = () => {
		setToast({ show: false, message: "", type: "" });
	};


	return (
		<div>
			{/* search box */}
			<div className="searchBox mt-20 flex flex-col mx-36">
				<h2 className='font-bold md:text-xl text-lg text-slate-500 mb-4'>Search your NPM Pakages</h2>
				<input className='flex-grow flex-shrink h-8 border-2 rounded border-slate-500 p-3 shadow-lg focus:shadow-xl ' type="text" name="search" id="search" onChange={debounced} />
			</div>

			{/* List scrollable */}
			<div className="max-h-48 overflow-y-auto mx-36 mt-10">
				<form>
					{data.map((option, index) => (
						<div key={index} className="mb-2">
							<input type="radio" id={`option${index + 1}`} name="options" className="mr-2" onClick={() => handleOptionClick(option.package.name)} />
							<label htmlFor={`option${index + 1}`}>{option.package.name}</label>
						</div>
					))}
				</form>
			</div>

			{selectedOption && (
				<div className="mx-36 mt-4">
					<label htmlFor="whyFav" className="font-bold md:text-xl text-lg text-slate-500 mb-2">Why is this your Fav?</label>
					<textarea
						id="whyFav"
						name="whyFav"
						className="border-2 rounded border-slate-500 p-3 shadow-lg focus:shadow-xl w-full resize h-24"
						value={whyFav}
						onChange={handleWhyFavChange}
					/>
				</div>
			)}

			{selectedOption && (<div className='flex justify-between'>
				<Link to={"/favs"}>
					<button
						className="mx-36 mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 shadow-md transition-all duration-300"
					>
						View Favs
					</button>
				</Link>
				<button
					className="mx-36 mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 shadow-md transition-all duration-300"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>)}

			{toast.show && (
				<div
					className={`fixed bottom-10 right-10 p-4 rounded shadow-md ${toast.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
						}`}
				>
					<span className="mr-2">{toast.message}</span>
					<button className="float-right text-white" onClick={handleToastClose}>
						X
					</button>
				</div>
			)}

		</div>
	)
}

export default AddFavs