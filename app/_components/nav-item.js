import Link from "next/link";

export default function NavItem({
  icon,
  label,
  onPageChange,
  currentPage,
  onLogOut,
  name
}) {
  const activeSideBar =
    currentPage === "home" && label === "Book Club"
      ? "font-bold underline underline-offset-8"
      : currentPage === "personal" && label === "Personal Summary"
      ? "font-bold underline underline-offset-8"
      : "";

  return (
    <div className="flex items-center space-x-2">
      <p className="text-lg italic font-semibold underline underline-offset-8">{name}</p>
      <Link href={currentPage === "home" ? "/personal" : "/home"}>
        <li
          className={`flex items-center space-x-2 p-2 
          rounded-lg  
         ${activeSideBar}
            font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900 hover:text-white hover:font-semibold transition duration-300 cursor-pointer`}
          onClick={label === "Logout" ? onLogOut : onPageChange}
        >
          {icon}
          <span>{label}</span>
        </li>
      </Link>
    </div>
  );
}
// border-teal-500 border-2 border-opacity-30 shadow-teal-500 p-6 rounded-lg shadow-md
