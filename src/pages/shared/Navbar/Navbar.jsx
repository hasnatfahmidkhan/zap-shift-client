import Logo from "../../../components/Logo/Logo";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";
import PrimaryArrow from "../../../components/PrimaryArrow/PrimaryArrow";
import MyLink from "../../../components/MyLink/MyLink";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, signOutFunc } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <MyLink to={"/"}>Services</MyLink>
      </li>
      <li>
        <MyLink to={"/coverage"}>Coverage</MyLink>
      </li>
      <li>
        <MyLink to={"/about-us"}>About Us</MyLink>
      </li>
      <li>
        <MyLink to={"/pricing"}>Pricing</MyLink>
      </li>
      <li>
        <MyLink to={"/be-a-rider"}>Be a Rider</MyLink>
      </li>
    </>
  );

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      toast.success("Sign Out Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <nav className="bg-base-100 shadow-sm p-4">
      <div className="p-0 max-w-7xl mx-auto navbar">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-3 text-accent text-base font-medium tracking-wide">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost pr-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 font-medium tracking-wide p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="hidden lg:flex gap-4 ">
            {user ? (
              <SecondaryBtn onClick={handleSignOut}>Log out</SecondaryBtn>
            ) : (
              <SecondaryBtn onClick={() => navigate("/login")}>
                Sign In
              </SecondaryBtn>
            )}
            <div className="flex items-center justify-center">
              <PrimaryBtn>Be a Rider</PrimaryBtn>
              <PrimaryArrow />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
