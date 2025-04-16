export default function ProgressTracker({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{value}%</span>
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
