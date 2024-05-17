export const MobileStats = ({ premiered, rating }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex-1">
        <h4 className="font-bold text-right">Premiered</h4>
        <p className="text-right">
          {new Date(premiered).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="h-10 w-px bg-gray-200"></div>
      <div className="flex-1">
        <h4 className="font-bold">Rating</h4>
        <p>
          <span className="text-blue-600">{rating.average.toFixed(1)}</span> /
          10
        </p>
      </div>
    </div>
  );
};
