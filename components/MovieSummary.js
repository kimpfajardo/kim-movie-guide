export const MovieSummary = ({ summary }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h4 className="font-bold text-center lg:text-left">Summary</h4>
      <hr className="border-blue-500 border w-8 mx-auto my-2 lg:hidden" />
      <div className="overflow-hidden transition-all">
        <div
          className={`text-xs sm:text-sm lg:text-base `}
          data-testid="movie-summary"
          dangerouslySetInnerHTML={{ __html: summary ?? "" }}
        />
      </div>
    </div>
  );
};
