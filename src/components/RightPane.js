import React, { useEffect } from 'react';
import ListAllClaims from './ListAllClaims';
import GroupedClaims from './GroupedClaims';
import { rsBgClassMap, rsTextColorMap } from '../constants';


const RightPane = ({ selectedChart, allClaimsForChart = [] }) => {
	// Transform the API data to match the expected format for the existing UI components
	const claims_and_evidence = allClaimsForChart.map(claim => ({
		claim: claim.title,
		evidence: Array.isArray(claim.evidence) ? claim.evidence : [claim.evidence].filter(Boolean),
		source: [claim.sourceOfEvidence],
		rs: claim.reasoningStrategy
	}));

	const uniqueRS = [...new Set(claims_and_evidence.map(item => item.rs))];
	const [shownClaims, setShownClaims] = React.useState(claims_and_evidence);
	const [filteredRS, setFilteredRS] = React.useState(uniqueRS);
	const [groupedByRS, setGroupedByRS] = React.useState(false);


	useEffect(() => {
		if (filteredRS.length === 0) {
			setShownClaims([]);
		} else {
			const filtered = claims_and_evidence.filter(item => filteredRS.includes(item.rs));
			setShownClaims(filtered);
		}
	}, [filteredRS, claims_and_evidence]);

	// Update state when allClaimsForChart changes
	useEffect(() => {
		setShownClaims(claims_and_evidence);
		const newUniqueRS = [...new Set(claims_and_evidence.map(item => item.rs))];
		setFilteredRS(newUniqueRS);
	}, [allClaimsForChart, claims_and_evidence]);

	return (
		<div className="flex flex-col gap-2 w-full px-4">
			<div
				className="bg-white rounded shadow p-2 flex flex-row justify-between sticky top-0 z-10"
			>
				<h2 className="text-left text-lg font-bold">Claims</h2>

				<button
					onClick={() => setGroupedByRS(!groupedByRS)}
					className="bg-black hover:bg-gray-800 text-white rounded text-sm font-medium transition-colors"
					style={{ width: 'fit-content', padding: '0.25rem 0.5rem' }}
				>
					{groupedByRS ? "Ungroup" : "Group by Reasoning Strategy"}
				</button>
			</div>

			{/* Controls */}
			{
				!groupedByRS && (
					<div id="rs-filter" className="flex gap-2 flex-wrap sticky top-12 z-10 py-2 bg-white">
						{uniqueRS.map(rs => (
							<span
								key={rs}
								onClick={() =>
									setFilteredRS(
										prev => prev.includes(rs) ? prev.filter(r => r !== rs) : [...prev, rs]
									)
								}
								className={`
								${rsBgClassMap[rs]} ${rsTextColorMap[rs]}
								px-2 py-1 rounded text-xs font-semibold cursor-pointer flex items-center gap-1
							`}
							>
								<input
									type="checkbox"
									checked={filteredRS.includes(rs)}
									readOnly
									className="accent-current"
									style={{ pointerEvents: 'none' }}
								/>
								{rs}
							</span>
						))}
					</div>
				)
			}

			{/* Claims and Evidence List */}
			{groupedByRS ? (
				<GroupedClaims uniqueRS={uniqueRS} claims={claims_and_evidence} />
			) : (
				<ListAllClaims shownClaims={shownClaims} />
			)}
		</div >
	);
};

export default RightPane;
