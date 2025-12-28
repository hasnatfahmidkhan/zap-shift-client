import ProfileIcon from "../ProfileIcon/ProfileIcon";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashBoardProfile = ({ className = "" }) => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className={`dropdown dropdown-end ${className} z-999 md:mr-5`}>
      <button tabIndex={0} className="flex items-center gap-5 cursor-pointer">
        <ProfileIcon user={user} />

        <div className="text-left hidden md:block">
          <h4 className="text-lg font-semibold">{user.displayName}</h4>
          <p className="text-sm text-accent font-semibold capitalize ">
            {role}
          </p>
        </div>
      </button>
    </div>
  );
};

export default DashBoardProfile;
