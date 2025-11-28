import { IoMenu } from "react-icons/io5";

const ProfileIcon = ({ user }) => {
  return (
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
      <span className="absolute bottom-0.5 right-0 bg-primary rounded-full p-0.5">
        <IoMenu color="#000000" />
      </span>
    </div>
  );
};

export default ProfileIcon;
