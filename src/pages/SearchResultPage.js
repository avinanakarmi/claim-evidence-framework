import React from "react";
import SearchComponent from "../components/SearchComponent";
import { useNavigate } from "react-router-dom";
import ClaimListCard from "../components/SearchListClaimCard";
import ClaimGridCard from "../components/SearchGridClaimCard";
import TopBar from "../components/TopBar";
import FilterBar from "../components/filter/FilterBar";
import { GridIcon, ListIcon } from "../components/Icons";

const mockClaims = [
	{
		id: 1,
		title: "Claim 1 similar to search topic",
		caption:
			"Caption here is Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus ex id elementum pharetra. Nam feugiat scelerisque orci, nec consectetur ipsum pellentesque ut. In interdum, leo a eleifend fringilla, felis erat porta elit, imperdiet tincidunt nunc felis sed dui. Donec at nisl aliquet, rhoncus lectus et, varius elit. Nunc lobortis mi at ornare aliquam. Quisque varius eleifend magna eu eleifend. Fusce ut eros sit amet mauris dapibus pulvinar tempus maximus lectus. Pellentesque scelerisque blandit nisl, in feugiat velit bibendum ut. Aliquam erat volutpat. Donec in euismod eros, non pulvinar leo.",
	},
	{
		id: 2,
		title: "Claim 2 similar to search topic",
		caption:
			"Caption here is Cras egestas elementum quam, sed accumsan neque accumsan et. In non lacus pretium, suscipit nibh vel, tincidunt lacus. Fusce quis tincidunt nunc, convallis consequat mi. Pellentesque dictum quam at dignissim rhoncus. Nullam sagittis, nibh eu tincidunt maximus, arcu elit ultrices justo, quis ultrices velit risus consequat leo. Nunc a pharetra orci. Quisque lobortis ligula in tortor porta dapibus. Proin ac augue metus. Fusce sollicitudin vitae orci vitae vulputate. Morbi sit amet metus a neque aliquam egestas vitae in mauris. Morbi aliquet tincidunt efficitur. Praesent tempor tellus id ex semper, bibendum imperdiet ante aliquet. Donec at aliquet quam, nec tristique quam. In hac habitasse platea dictumst. Quisque consectetur dictum ultrices. Proin at mi nec metus dapibus pharetra a at felis. Sed in congue enim, a lobortis orci. Etiam venenatis sollicitudin urna, ut fermentum erat tempor non. Nullam lorem est, vestibulum non felis in, tincidunt imperdiet lacus. Nunc neque nisl, cursus in tempus non, sollicitudin tempor elit. Suspendisse ornare ipsum vel tellus dapibus, ut facilisis neque lacinia. Cras hendrerit lectus nibh, ut mollis purus scelerisque sed. Aliquam ullamcorper libero ex, a imperdiet nunc accumsan et. Donec porttitor quis tellus ac finibus. Curabitur non ornare lectus. Morbi aliquet molestie ligula, sit amet iaculis ante pharetra non. Vivamus porta turpis tellus, vitae aliquam orci lacinia id. Morbi eu orci maximus, tempor justo vel, mattis neque. Donec bibendum egestas tortor ac consectetur.",

	},
	{
		id: 3,
		title: "Claim 3 similar to search topic",
		caption:
			"Caption here is Donec consequat, tellus non interdum cursus, erat nisi posuere lectus, eget lobortis est neque a augue. Donec consectetur nibh nibh, id auctor nunc placerat ac. Pellentesque consequat mi nulla, in porttitor dui feugiat vel. Proin volutpat, neque eu consectetur efficitur, urna erat lobortis justo, a rhoncus purus ipsum eu dolor. Nam facilisis interdum efficitur. Etiam et condimentum ligula. Nam porttitor, nulla nec ullamcorper ultrices, ipsum lorem tempor felis, vitae suscipit leo metus porta ante. Aliquam suscipit iaculis iaculis.",

	},
	{
		id: 4,
		title: "Claim 4 similar to search topic",
		caption:
			"Caption here is Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus ex id elementum pharetra. Nam feugiat scelerisque orci, nec consectetur ipsum pellentesque ut. In interdum, leo a eleifend fringilla, felis erat porta elit, imperdiet tincidunt nunc felis sed dui. Donec at nisl aliquet, rhoncus lectus et, varius elit. Nunc lobortis mi at ornare aliquam. Quisque varius eleifend magna eu eleifend. Fusce ut eros sit amet mauris dapibus pulvinar tempus maximus lectus. Pellentesque scelerisque blandit nisl, in feugiat velit bibendum ut. Aliquam erat volutpat. Donec in euismod eros, non pulvinar leo.",
	},
	{
		id: 5,
		title: "Claim 5 similar to search topic",
		caption:
			"Caption here is Cras egestas elementum quam, sed accumsan neque accumsan et. In non lacus pretium, suscipit nibh vel, tincidunt lacus. Fusce quis tincidunt nunc, convallis consequat mi. Pellentesque dictum quam at dignissim rhoncus. Nullam sagittis, nibh eu tincidunt maximus, arcu elit ultrices justo, quis ultrices velit risus consequat leo. Nunc a pharetra orci. Quisque lobortis ligula in tortor porta dapibus. Proin ac augue metus. Fusce sollicitudin vitae orci vitae vulputate. Morbi sit amet metus a neque aliquam egestas vitae in mauris. Morbi aliquet tincidunt efficitur. Praesent tempor tellus id ex semper, bibendum imperdiet ante aliquet. Donec at aliquet quam, nec tristique quam. In hac habitasse platea dictumst. Quisque consectetur dictum ultrices. Proin at mi nec metus dapibus pharetra a at felis. Sed in congue enim, a lobortis orci. Etiam venenatis sollicitudin urna, ut fermentum erat tempor non. Nullam lorem est, vestibulum non felis in, tincidunt imperdiet lacus. Nunc neque nisl, cursus in tempus non, sollicitudin tempor elit. Suspendisse ornare ipsum vel tellus dapibus, ut facilisis neque lacinia. Cras hendrerit lectus nibh, ut mollis purus scelerisque sed. Aliquam ullamcorper libero ex, a imperdiet nunc accumsan et. Donec porttitor quis tellus ac finibus. Curabitur non ornare lectus. Morbi aliquet molestie ligula, sit amet iaculis ante pharetra non. Vivamus porta turpis tellus, vitae aliquam orci lacinia id. Morbi eu orci maximus, tempor justo vel, mattis neque. Donec bibendum egestas tortor ac consectetur.",

	},
	{
		id: 6,
		title: "Claim 6 similar to search topic",
		caption:
			"Caption here is Donec consequat, tellus non interdum cursus, erat nisi posuere lectus, eget lobortis est neque a augue. Donec consectetur nibh nibh, id auctor nunc placerat ac. Pellentesque consequat mi nulla, in porttitor dui feugiat vel. Proin volutpat, neque eu consectetur efficitur, urna erat lobortis justo, a rhoncus purus ipsum eu dolor. Nam facilisis interdum efficitur. Etiam et condimentum ligula. Nam porttitor, nulla nec ullamcorper ultrices, ipsum lorem tempor felis, vitae suscipit leo metus porta ante. Aliquam suscipit iaculis iaculis.",

	},
];

const SearchResultPage = ({ query, setQuery }) => {
	const navigate = useNavigate();
	const [selectedView, setSelectedView] = React.useState("list");

	const handleSearch = (q) => {
		if (q) {
			setQuery(q);
			navigate('/results?q=' + encodeURIComponent(q));
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<TopBar />
			<main className="mx-auto w-full px-4 py-6">
				{/* Search row */}
				<div className="flex flex-row justify-between items-center mb-1">
					<SearchComponent onSearch={handleSearch} query={query} setQuery={setQuery} />
					<div className="flex border border-gray-400 rounded-full overflow-hidden">
						<button
							className={`flex items-center px-3 py-1 transition-colors ${
								selectedView === "list"
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
							className={`flex items-center px-3 py-1 transition-colors border-l border-gray-400 ${
								selectedView === "grid"
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
				<FilterBar />

				{/* Claims list */}
				<section className={selectedView === "list" ? "mt-3 space-y-3" : "mt-3 grid grid-cols-3 gap-3"}>
						{mockClaims.map((c, idx) => (
							<div key={c.id} className="space-y-3 bg-white shadow-sm">
								{selectedView === "list" ? (
									<ClaimListCard claim={c} />
								) : (
									<ClaimGridCard claim={c} />
								)}
							</div>
						))}
				</section>
			</main>
		</div>
	);
}
export default SearchResultPage;