import ReasoningCard from "./RScard";

const GroupedClaims = ({ uniqueRS, claims }) => {
  const cardHeight =
    uniqueRS.length === 4
      ? "h-[calc((100vh-130px)/4)]"
      : uniqueRS.length === 3
        ? "h-[calc((100vh-130px)/3)]"
        : uniqueRS.length === 2
          ? "h-[calc((100vh-130px)/2)]"
          : "h-auto";

  return (
    <div className="flex flex-col gap-1">
      {uniqueRS.map((rs) => (
        <div key={rs} className={cardHeight}>
          <ReasoningCard
            rs={rs}
            claims={claims.filter((item) => item.rs === rs)}
          />
        </div>
      ))}
    </div>
  );
};

export default GroupedClaims;
