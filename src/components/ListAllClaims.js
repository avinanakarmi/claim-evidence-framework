import React from 'react';
import { rsBgClassMap, rsTextColorMap } from '../constants';

const ListAllClaims = ({shownClaims}) => {
	return (
		<>
			{
				shownClaims.length === 0 ? (
					<div className="text-gray-500">No claims to display</div>
				) :
					shownClaims.map((item, idx) => (
						<div key={idx} className="border-b border-gray-300 p-1 flex flex-row relative">
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
							<div
								id={`rs-of-claim-${idx}`}
								className={`
							${rsBgClassMap[item.rs]} ${rsTextColorMap[item.rs]}
							px-2 py-0.5 rounded text-xs font-semibold
							absolute top-1 right-4
						`}
								style={{ width: 'fit-content', minWidth: 'max-content' }}
							>
								{item.rs}
							</div>
						</div>
					))
			}
		</>
	);
}


export default ListAllClaims;