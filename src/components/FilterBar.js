import FilterItem from "./FilterItem";

const filters = {
	"Chart type": ["Bar Chart", "Line Chart", "Pie Chart", "Scatter Plot", "Area Chart", "Heatmap"], 
	"Reasoning Strategy": ["Contrastive Reasoning", "Causal Inference", "Corroboration", "Triangulation"],
	"Source of Evidence": ["Chart Only", "Chart + Caption", "Caption Only"], 
	"Domain": ["Energy", "Climate"]
}

const FilterBar = ({ query, setQuery }) => {
	const applyFilter = (filter, selectedOptions) => {
		// noop
	};

	return (
		<div className="flex flex-wrap items-center border-b pb-1 relative">
			{/* Genre Dropdown */}
			<div className="flex flex-row gap-10">
				{
					Object.keys(filters).map(f => (
						<FilterItem key={f} filter={f} options={filters[f]} applyFilter={applyFilter} />
					))
				}
			</div>
			{/* Filter button */}
			<button className="filter-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" />
				</svg>
				Filter
			</button>
		</div>
	);
};

export default FilterBar;
