import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInfiniteSearchClaims } from '../hooks/useClaims';


const SearchComponent = ({ lastQuery }) => {
	const navigate = useNavigate();
	const [query, setQuery] = useState(lastQuery || '');

	const [showSuggestions, setShowSuggestions] = useState(false);
	const suggestions = [
		"Climate change",
		"Energy demand",
		"Socio-economic drivers",
		"Fossil fuel scenarios",
		"Sustainability pathways"
	];
	const filteredSuggestions = query.trim() === ""
		? suggestions
		: suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
	const inputRef = useRef(null);

	const {data: claims = [], isLoading, error, refetch } = useInfiniteSearchClaims(query, {
		enabled: false
	});

	useEffect(() => {
		if (claims.length === 0 && lastQuery && lastQuery !== "") {
			refetch();
		}
	}, [lastQuery]);

	// Only trigger search on handleSubmit
	const handleSubmit = (e) => {
		setShowSuggestions(false);
		e.preventDefault();
		if (query.trim()) {
			setQuery(query.trim());
			refetch();
			navigate('/results?q=' + encodeURIComponent(query.trim()));
		}
	};

	// Hide suggestions when clicking outside
	React.useEffect(() => {
		const handleClick = (e) => {
			if (inputRef.current && !inputRef.current.contains(e.target)) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	return (
		<form className="w-full max-w-xl flex flex-col items-center" onSubmit={handleSubmit}>
			{error && (
				<div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					Error searching: {error.message}
				</div>
			)}
			<div className="relative w-full" ref={inputRef}>
				<input
					type="text"
					className="w-full border border-gray-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow pr-12"
					placeholder="Search..."
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={() => setShowSuggestions(true)}
					autoComplete="off"
				/>
				<button
					type="submit"
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none disabled:opacity-50"
					tabIndex={-1}
					aria-label="Search"
					disabled={isLoading}
				>
					{isLoading ? (
						<svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
						</svg>
					)}
				</button>
				{showSuggestions && filteredSuggestions.length > 0 && (
					<ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
						<li key="hint" className='text-sm font-bold px-6 pt-2 text-gray-300'>Suggestions</li>
						{filteredSuggestions.map((s, i) => {
							const lowerQuery = query.toLowerCase();
							const lowerS = s.toLowerCase();
							let matchIdx = lowerS.indexOf(lowerQuery);
							let before = s;
							let after = "";
							if (lowerQuery && matchIdx !== -1) {
								before = s.slice(0, matchIdx + lowerQuery.length);
								after = s.slice(matchIdx + lowerQuery.length);
							}
							return (
								<li
									key={i}
									className="px-6 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
									onMouseDown={() => {
										setQuery(s);
										setShowSuggestions(false);
									}}
								>
									{before}
									{after && <b>{after}</b>}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</form>
	);
};

export default SearchComponent;
