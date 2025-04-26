import Link from "next/link";

export default function NavItem({
  icon,
  label,
  onPageChange,
  currentPage,
  onLogOut,
  name
}) {

  const getActiveSideBar = () => {
    if (currentPage === "home" && label === "Book Club") {
      return "font-bold underline underline-offset-8";
    } 
    if (currentPage === "personal" && label === "Personal Summary") {
      return "font-bold underline underline-offset-8";
    } 
    
  };

  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm italic font-semibold">{name}</p>
      <button type="button">
        <li
          className={`flex items-center space-x-2 p-2 
          rounded-lg  
         ${getActiveSideBar()}
            font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900/90 hover:text-white hover:font-semibold transition duration-300 cursor-pointer`}
          onClick={label === "Logout" ? onLogOut : onPageChange}
        >
          {icon}
          <span>{label}</span>
        </li>
      </button>
    </div>
  );
}
// border-teal-500 border-2 border-opacity-30 shadow-teal-500 p-6 rounded-lg shadow-md
