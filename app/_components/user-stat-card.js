export default function UserStatCard({
  icon,
  title,
  value,
  subtext,
  progress,
}) {
  return (
    <div
      className="shadow-neutral-700 p-6 rounded-lg shadow-inner border-b-2 border-white border-opacity-30"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{subtext}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
