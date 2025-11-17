import { IoMenu } from "react-icons/io5";

const ProfileLogo = ({ user, userLinks, className }) => {
  return (
    <div className={`dropdown ${className}`}>
      
      <div
        tabIndex={0}
        role="button"
        className="bg-primary p-1 w-14 h-14 rounded-full cursor-pointer relative"
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={user?.photoURL}
          alt={user?.displayName}
          onError={(e) => (e.target.src = "profile.png")}
        />
        <span className="absolute bottom-1 right-1 bg-primary rounded-full p-0.5">
          <IoMenu color="#000000" />
        </span>
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu menu-lg bg-base-100 rounded-box z-20 w-52 p-4 shadow-sm font-semibold tracking-wide divide-y divide-gray-400 divide-dashed space-y-2 border border-gray-200"
      >
        {userLinks}
      </ul>
    </div>
  );
};

export default ProfileLogo;
