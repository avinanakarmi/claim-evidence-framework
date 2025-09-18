import { rsDarkBgClassMap, rsDarkBorderClassMap} from '../constants';


const ReasoningCard = ({ rs, claims }) => {
	return (
		<div className={`relative h-full rounded-2xl border-2 ${rsDarkBorderClassMap[rs]} bg-white overflow-hidden`}>
			{/* Right ribbon */}
			<div className={`absolute inset-y-0 right-0 w-16 ${rsDarkBgClassMap[rs]} text-white flex items-center justify-center
                      [writing-mode:vertical-rl] rotate-270 font-lg font-bold`}>
				{rs}
			</div>

			{/* Content */}
			<div className="p-6 pr-24 overflow-y-auto h-full">
				{/* <div className={`h-8 w-8 rounded-full ${rsMidBgClassMap[rs]} absolute bottom-2 right-20 flex items-center justify-center`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`h-5 w-5 ${rsTextColorMap[rs]}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</div> */}


				{claims.map((item, idx) => (
					<div key={idx} className="p-1 flex flex-row relative" style={{ borderBottom: idx < claims.length - 1 ? '3px solid #e5e7eb' : 'none' }}>
						<div className="flex flex-row items-start gap-2 flex-1" style={{ marginRight: '150px' }}>
							<div className="flex-1 flex flex-col">
								<div className="text-gray-900 font-medium text-left">
									{item.claim}
								</div>
								<span className="font-semibold text-left text-gray-500">Evidence: </span>
								<ul className="list-disc list-inside text-gray-500 ml-0 pl-4">
									{item.evidence.map((ev, i) => (
										<li key={i} className="text-left">{ev}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}



			</div>
		</div>
	);
};

export default ReasoningCard;
