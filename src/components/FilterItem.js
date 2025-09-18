import React, { useEffect, useRef } from "react";


const FilterItem = ({ filter, options, applyFilter }) => {
	const itemRef = useRef();
	const [showDropdown, setShowDropdown] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState([]);
	const [gridCountClass, setGridCount] = React.useState("");

	useEffect(() => {
		applyFilter(filter, selectedOptions);
	}, [selectedOptions]);

	// Hide dropdown when clicking outside
	useEffect(() => {
		if (!showDropdown) return;
		const handleClickOutside = (event) => {
			if (itemRef.current && !itemRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	useEffect(() => {
		if(filter === "Reasoning Strategy") setGridCount("grid-cols-2");
		else if (options.length <= 3) setGridCount("grid-cols-1");
		else setGridCount("grid-cols-3");
	}, [options, filter]);

	return (
		<div className="relative text-sm" ref={itemRef}>
			<button type="button" onClick={() => setShowDropdown(v => !v)}
				className="filter-dropdown">
				{filter}: <span className="filter-selected ">{
					selectedOptions.length === 0
						? "All"
						: selectedOptions.length === 1
							? selectedOptions[0]
							: `${selectedOptions.length} selected`
				}</span> <span className="ml-1">▼</span>
			</button>
			{showDropdown && (
				<div
					className="absolute left-0 top-6 z-20 bg-white shadow-2xl rounded-md p-2 flex flex-wrap"
					style={{ minWidth: `${150 * (filter === "Reasoning Strategy" ? 3 : Number(gridCountClass.split("-").pop()))}px` }}
				>
					<div className={`grid ${gridCountClass} gap-x-8 gap-y-2`}>
						{options.map((g, i) => (
							<label key={g} className={`flex items-center gap-2 cursor-pointer text-gray-900 text-base font-semibold select-none`}>
								<input
									type="checkbox"
									checked={selectedOptions.includes(g)}
									onChange={() => {
										setSelectedOptions(prev =>
											prev.includes(g)
												? prev.filter(x => x !== g)
												: [...prev, g]
										);
									}}
									className="accent-indigo-500 w-4 h-4 rounded mr-1"
								/>
								{g}
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default FilterItem;