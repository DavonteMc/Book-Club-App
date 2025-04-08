import Link from "next/link";

export default function NavItem({
  icon,
  label,
  onPageChange,
  currentPage,
  onLogOut,
}) {
  const activeSideBar =
    currentPage === "home" && label === "Book Club"
      ? "bg-neutral-700 bg-opacity-35 font-bold"
      : currentPage === "personal" && label === "Personal Summary"
      ? "bg-neutral-700 bg-opacity-35  font-bold"
      : "";

  return (
    <Link href={currentPage === "home" ? "/personal" : "/home"}>
      <li
        className={`flex items-center space-x-2 p-2 
         shadow-neutral-700 border-b-2 border-white border-opacity-30 rounded-lg shadow-inner 
         ${activeSideBar}
          hover:bg-neutral-600 hover:bg-opacity-35 rounded-md cursor-pointer`}
        onClick={label === "Logout" ? onLogOut : onPageChange}
      >
        {icon}
        <span>{label}</span>
      </li>
    </Link>
  );
}
// border-teal-500 border-2 border-opacity-30 shadow-teal-500 p-6 rounded-lg shadow-md
