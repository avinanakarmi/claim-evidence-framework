import React from 'react';

const LeftPane = () => (
	<div className="min-h-[calc(100vh-64px)] w-full flex flex-col gap-4 p-2">
		<h2 className="text-left w-full text-lg font-bold">Chart + Caption</h2>
		{/* Chart Area */}
		<div className="p-0 sm:p-4 flex flex-col items-center justify-center">
			<div className="w-full flex items-center justify-center rounded mb-2">
				<img
					src="/639.png"
					alt="Chart"
					className="w-full h-auto object-contain"
				/>
			</div>
		</div>
		{/* Figure Caption */}
		<div className="p-2 sm:p-3 flex items-start justify-center">
			<span className="text-gray-700 text-justify leading-relaxed sm:leading-normal text-base sm:text-sm">
				Figure 2.4 | Range of assumptions about socio-economic drivers and projections for energy and food demand in the pathways available to this assessment. 1.5degC-consistent pathways are blue, other pathways grey. Trajectories for the illustrative 1.5degC-consistent archetypes used in this Chapter (LED, S1, S2, S5; referred to as P1, P2, P3, and P4 in the Summary for Policymakers.) are highlighted. S1 is a sustainability oriented scenario, S2 is a middle-of-the-road scenario, and S5 is a fossil-fuel intensive and high energy demand scenario. LED is a scenario with particularly low energy demand. Population assumptions in S2 and LED are identical. Panels show (a) world population, (b) gross world product in purchasing power parity values, (c) final energy demand, and (d) food demand.
			</span>
		</div>
	</div>
);

export default LeftPane;
