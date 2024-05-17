export const KeyValueField = ({ symbol, label, value }) => {
  return (
    <div className="flex w-full gap-2">
      <div style={{ width: 100}}>
        <div className="flex items-center gap-2">
          <div>{symbol}</div>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
      <div className="text-sm font-bold">
        <p>{value}</p>
      </div>
    </div>
  );
};
