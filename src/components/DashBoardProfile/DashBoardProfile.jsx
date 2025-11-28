import { ChevronDown } from "lucide-react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import useAuth from "../../hooks/useAuth";

const DashBoardProfile = ({ className = "", menuLinks }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <button tabIndex={0} className="flex items-center gap-5 cursor-pointer">
        <ProfileIcon user={user} />

        <div className="text-left hidden md:block">
          <h4 className="text-lg font-semibold">{user.displayName}</h4>
          <p className="text-sm text-accent font-medium">Admin</p>
        </div>
        <ChevronDown size={20} className="text-gray-600 hidden md:block" />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu menu-lg bg-base-100 rounded-box z-20 w-52 p-4 shadow-sm font-semibold tracking-wide divide-y divide-gray-400 divide-dashed space-y-2 border border-gray-200"
      >
        {menuLinks?.map(({ id, label }) => (
          <li key={id} className="py-2 cursor-pointer">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoardProfile;
