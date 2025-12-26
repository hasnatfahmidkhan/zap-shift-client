import ProfileIcon from "../ProfileIcon/ProfileIcon";

const ProfileNav = ({ user, privateLinks, className }) => {
  return (
    <div className={`dropdown ${className}`}>
      <ProfileIcon user={user} />
      <ul
        tabIndex="-1"
        className="dropdown-content menu menu-lg bg-base-100 rounded-box z-50 w-52 p-4 shadow-sm font-semibold tracking-wide divide-y divide-gray-400 divide-dashed space-y-2 border border-gray-200"
      >
        {privateLinks}
      </ul>
    </div>
  );
};

export default ProfileNav;
