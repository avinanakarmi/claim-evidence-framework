import { useNavigate } from "react-router-dom";

const ClaimListCard = ({ claim }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/detail/' + claim.id);
	};

	return (
		<article
			className="flex flex-col h-[12rem] gap-2 cursor-pointer overflow-hidden"
			onClick={handleClick}
		>
			<h3 className="text-xl font-semibold">
				{claim.title}
			</h3>

			<div className="flex flex-row h-[calc(12rem-40px)] gap-4">
				<img
					src={`https://picsum.photos/id/${claim.id}/300/300`}
					alt={`Thumbnail for ${claim.title}`}
					className="w-[300px] h-full object-contain rounded-md bg-gray-100"
				/>
				<p className="mt-1 flex-1 text-sm leading-6 text-gray-700 line-clamp-6">
					{claim.caption}
				</p>
			</div>
		</article>
	);
}


export default ClaimListCard;