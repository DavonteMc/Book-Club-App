export default function ProgressTracker({ name, value, page }) {
  return (
    <div className="mb-3">
      <p className="text-xl font-semibold">{name}</p>
      <div className="flex justify-between mb-1">
        <p className="text-lg">pg.{page === undefined ? 0 : page}</p>
        <p className="text-xl font-bold">{value}%</p>
      </div>

      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 rounded-full h-2"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
