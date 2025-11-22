import { NavLink } from "react-router";

const MyLink = ({ to, children, end = false }) => {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        isActive
          ? "btn btn-primary border-none text-black text-base rounded-full transition-all duration-300"
          : "btn btn-ghost px-4 py-3 rounded-full hover:bg-primary text-base border-none transition-all duration-300"
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
