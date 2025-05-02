export default function ProgressTracker({ name, value, page, total }) {
  return (
    <div className="py-5 px-5 w-full">
      <p className="text-base md:text-xl font-semibold">{name}</p>
      <div className="flex justify-between mb-1">
        <p className="text-sm md:text-lg">
          pg.<span className="font-semibold">{page === undefined ? 0 : page}</span> of{" "}
          <span className="font-semibold">{total}</span>
        </p>
        <p className="text-base md:text-xl font-bold">{value}%</p>
      </div>
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-700 rounded-full h-2"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
