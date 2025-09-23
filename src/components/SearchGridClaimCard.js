const ClaimCard = ({ claim, handleClick }) => {
	return (
		<article
      className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => handleClick(claim.image_id)}
    >
      {/* Header: Claim Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {claim.title}
      </h3>
      {/* Chart Placeholder */}
      <div className="flex items-center justify-center h-32 bg-indigo-50 rounded-md border border-indigo-100 mb-2">
        <img
					src={`https://picsum.photos/id/${claim.image_id}/300/300`}
					alt={`Thumbnail for ${claim.title}`}
					className="w-[300px] h-full object-contain rounded-md bg-gray-100"
				/>
      </div>
      {/* Caption */}
      <p className="text-gray-700 text-sm leading-6 line-clamp-4">
        {claim.caption}
      </p>
    </article>
	);
}


export default ClaimCard;