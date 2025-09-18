import React, { useEffect } from 'react';
import ListAllClaims from './ListAllClaims';
import GroupedClaims from './GroupedClaims';
import { rsBgClassMap, rsTextColorMap } from '../constants';

const claims_and_evidence = [
	{
		"claim": "1.5°C-consistent pathways tend to require lower final energy demand than other pathways",
		"evidence": [
			"1.5°C-consistent pathways are blue, other pathways grey …",
			"Panel (c): blue curves lie mostly below grey by 2100."
		],
		"source": ["chart", "caption"],
		"rs": "Corroboration"
	},
	{
		"claim": "Gross world product rises strongly across scenarios through 2100",
		"evidence": [
			"Panel (b): gross world product trajectories rise steadily toward 2100 across lines."
		],
		"source": ["chart"],
		"rs": "Contrastive Reasoning"
	},
	{
		"claim": "The highlighted S5 pathway ends with both higher GDP and higher final energy demand than other archetypes",
		"evidence": [
			"S5 highlighted",
			"Panels (b,c): S5 curves are near the top by 2100 relative to S1, S2, LED."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "LED's food demand per capita declines over time, while S1 and S2 increase",
		"evidence": [
			"Panel (d): LED trend falls; S1 and S2 trend upward."
		],
		"source": ["chart", "caption"],
		"rs": "Triangulation"
	},
	{
		"claim": "With S2 and LED sharing identical population assumptions, their different energy-demand paths imply different per-capita energy use",
		"evidence": [
			"Population assumptions in S2 and LED are identical",
			"Panel (c): LED is consistently below S2."
		],
		"source": ["chart", "caption"],
		"rs": "Causal Inference"
	},
];

const uniqueRS = [...new Set(claims_and_evidence.map(item => item.rs))];

const RightPane = () => {
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
	}, [filteredRS]);

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
