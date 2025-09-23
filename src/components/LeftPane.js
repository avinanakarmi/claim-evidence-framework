import React from 'react';

const LeftPane = ({image_id, caption}) => (
	<div className="min-h-[calc(100vh-64px)] w-full flex flex-col gap-4 p-2">
		<h2 className="text-left w-full text-lg font-bold">Chart + Caption</h2>
		{/* Chart Area */}
		<div className="p-0 sm:p-4 flex flex-col items-center justify-center">
			<div className="w-full flex items-center justify-center rounded mb-2">
				<img
					src={`https://picsum.photos/id/${image_id}/639.png`}
					alt="Chart"
					className="w-full h-auto object-contain"
				/>
			</div>
		</div>
		{/* Figure Caption */}
		<div className="p-2 sm:p-3 flex items-start justify-center">
			<span className="text-gray-700 text-justify leading-relaxed sm:leading-normal text-base sm:text-sm">
				{caption}
			</span>
		</div>
	</div>
);

export default LeftPane;
