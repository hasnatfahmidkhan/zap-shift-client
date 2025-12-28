import ProfileIcon from "../ProfileIcon/ProfileIcon";
import useAuth from "../../hooks/useAuth";

const DashBoardProfile = ({ className = "" }) => {
  const { user } = useAuth();

  return (
    <div className={`dropdown dropdown-end ${className} z-999`}>
      <button tabIndex={0} className="flex items-center gap-5 cursor-pointer">
        <ProfileIcon user={user} />

        <div className="text-left hidden md:block">
          <h4 className="text-lg font-semibold">{user.displayName}</h4>
          <p className="text-sm text-accent font-medium">Admin</p>
        </div>
      </button>
    </div>
  );
};

export default DashBoardProfile;
