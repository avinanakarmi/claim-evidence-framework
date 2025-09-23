import React, { useMemo } from "react";
import SearchComponent from "../components/SearchComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClaimListCard from "../components/SearchListClaimCard";
import ClaimGridCard from "../components/SearchGridClaimCard";
import TopBar from "../components/TopBar";
import FilterBar from "../components/filter/FilterBar";
import { GridIcon, ListIcon } from "../components/Icons";
import { useInfiniteSearchClaims } from "../hooks/useClaims";

const SearchResultPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [selectedView, setSelectedView] = React.useState("list");
	const [appliedFilters, setAppliedFilters] = React.useState({});

	// Use React Query infinite query to fetch search results
	const { 
		data, 
		isLoading, 
		error, 
		fetchNextPage, 
		hasNextPage, 
		isFetchingNextPage 
	} = useInfiniteSearchClaims(query, {
		enabled: false
	});

	// Flatten all pages of claims into a single array
	const claims = useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap(page => page.claims || []);
	}, [data]);

		// Filter claims based on appliedFilters
	const displayedClaims = useMemo(() => {
		let filtered = claims;
		Object.keys(appliedFilters).forEach((filterKey) => {
			const selectedOptions = appliedFilters[filterKey];
			if (selectedOptions && selectedOptions.length > 0) {
				filtered = filtered.filter((claim) =>
					selectedOptions.includes(
						filterKey === "Chart type"
							? claim.chartType
							: filterKey === "Reasoning Strategy"
								? claim.reasoningStrategy
								: filterKey === "Source of Evidence"
									? claim.sourceOfEvidence
									: filterKey === "Domain"
										? claim.domain
										: ""
					)
				);
			}
		});
		return filtered;
	}, [claims, appliedFilters]);

	const handleClick = (id) => {
		navigate('/detail/' + id);
	};

	// Handle loading and error states
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<TopBar />
				<main className="mx-auto w-full px-4 py-6">
					<div className="text-center">Loading claims...</div>
				</main>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50">
				<TopBar />
				<main className="mx-auto w-full px-4 py-6">
					<div className="text-center text-red-600">
						Error loading claims: {error.message}
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<TopBar />
			<main className="mx-auto w-full px-4 py-6">
				{/* Search row */}
				<div className="flex flex-row justify-between items-center mb-1">
					<SearchComponent lastQuery={query} />
					<div className="flex border border-gray-400 rounded-full overflow-hidden">
						<button
							className={`flex items-center px-3 py-1 transition-colors ${selectedView === "list"
									? "bg-blue-100 text-blue-900"
									: "bg-white text-gray-800"
								}`}
							onClick={() => setSelectedView("list")}
							aria-label="List view"
							type="button"
						>
							<ListIcon />
						</button>
						<button
							className={`flex items-center px-3 py-1 transition-colors border-l border-gray-400 ${selectedView === "grid"
									? "bg-blue-100 text-blue-900"
									: "bg-white text-gray-800"
								}`}
							onClick={() => setSelectedView("grid")}
							aria-label="Grid view"
							type="button"
						>
							<GridIcon />
						</button>
					</div>
				</div>

				<p className="mt-1 text-md font-semibold">
					<span className="text-gray-400">Search topic:</span>{" "}
					<span className="text-gray-500">{query}</span>
				</p>

				{/* Filter bar */}
				<FilterBar filterResults={setAppliedFilters} />

				{/* Claims list */}
				{displayedClaims.length === 0 ? (<div className="text-gray-500">No claims to display</div>) : (
					<>
						<section className={selectedView === "list" ? "mt-3 space-y-3" : "mt-3 grid grid-cols-3 gap-3"}>
							{displayedClaims.map((c, idx) => (
								<div key={c.id} className="space-y-3 bg-white shadow-sm">
									{selectedView === "list" ? (
										<ClaimListCard claim={c} handleClick={handleClick} />
									) : (
										<ClaimGridCard claim={c} handleClick={handleClick} />
									)}
								</div>
							))}
						</section>
						
						{/* Load More Button */}
						{hasNextPage && (
							<div className="mt-6 text-center">
								<button
									onClick={() => fetchNextPage()}
									disabled={isFetchingNextPage}
									className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
								>
									{isFetchingNextPage ? 'Loading more...' : 'Load More Claims'}
								</button>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
}
export default SearchResultPage;