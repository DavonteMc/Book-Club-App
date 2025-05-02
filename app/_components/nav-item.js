import Link from "next/link";
import { useApp } from "../_utils/app-context";

export default function NavItem({ icon, label, name, desktop }) {
  const { page, handleLogOut } = useApp();

  const getActiveSideBar = () => {
    if (page === "home" && label === "Book Club") {
      return "font-bold underline underline-offset-8";
    }
    if (page === "personal" && label === "Personal Summary") {
      return "font-bold underline underline-offset-8";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {desktop && <p className="text-sm italic font-semibold">{name}</p>}
      {label !== "Logout" && (
        <div>
          <Link href={label === "Book Club" ? "home" : "personal-summary"}>
            <li
              className={`flex items-center space-x-2 p-2 
        rounded-lg  
       ${getActiveSideBar()}
          font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900/90 hover:text-white hover:font-semibold transition duration-300 cursor-pointer`}
            >
              {icon}
              <span>{label}</span>
            </li>
          </Link>
        </div>
      )}
      {label === "Logout" && (
        <div>
          <button
            className="flex items-center space-x-2 p-2 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900/90 hover:text-white hover:font-semibold transition duration-300 cursor-pointer"
            onClick={handleLogOut}
          >
            {icon}
            <span>{label}</span>
          </button>
        </div>
      )}
    </div>
  );
}
