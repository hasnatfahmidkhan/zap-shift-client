import {
  House,
  LogOut,
  MapPin,
  Motorbike,
  Package,
  PanelRightClose,
  ReceiptText,
  Users,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Logo from "../../components/Logo/Logo";
import MyLink from "../../components/MyLink/MyLink";
import DashBoardProfile from "../../components/DashBoardProfile/DashBoardProfile";
import DashIcon from "../../components/DashIcon/DashIcon";
import useRole from "../../hooks/useRole";
import Spinner from "../../components/Spinner/Spinner";

const DashboardLayout = () => {
  const { role, userRoleLoading } = useRole();
  const { signOutFunc } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOutFunc();
      toast.success("Sign Out Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (userRoleLoading) {
    return <Spinner />;
  }

  const sidebarLinks = [
    {
      id: 1,
      type: "link",
      label: "Homepage",
      to: "/",
      icon: <DashIcon Icon={House} />,
      roles: ["admin", "user"], // visible to all
    },
    {
      id: 2,
      type: "link",
      label: "My Parcels",
      to: "/dashboard/my-parcels",
      icon: <DashIcon Icon={Package} />,
      roles: ["admin", "user"],
    },
    {
      id: 3,
      type: "link",
      label: "Payment History",
      to: "/dashboard/payment-history",
      icon: <DashIcon Icon={ReceiptText} />,
      roles: ["admin", "user"],
    },
    {
      id: 4,
      type: "link",
      label: "Approve Rider",
      to: "/dashboard/approve-rider",
      icon: <DashIcon Icon={Motorbike} />,
      roles: ["admin"], // admin only
    },
    {
      id: 5,
      type: "link",
      label: "Manage Users",
      to: "/dashboard/manage-users",
      icon: <DashIcon Icon={Users} />,
      roles: ["admin"], // admin only
    },
    {
      id: 6,
      type: "link",
      label: "Assign Riders",
      to: "/dashboard/assign-riders",
      icon: <DashIcon Icon={MapPin} />,
      roles: ["admin"], // admin only
    },
    {
      id: 7,
      type: "button",
      label: "Sign Out",
      action: "logout",
      icon: <DashIcon Icon={LogOut} />,
      roles: ["admin", "user"],
    },
  ];

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar justify-between items-center w-full bg-base-100 py-3.5 px-6">
            {/* logo and open icon  */}
            <div className="flex items-center">
              <label
                htmlFor="sidebar"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost "
              >
                {/* Sidebar toggle icon */}
                <PanelRightClose size={21} />
              </label>
              <div className="">
                <Logo />
              </div>
            </div>
            {/* user profile */}
            <DashBoardProfile />
          </nav>
          {/* Page content here */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="sidebar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-100 shadow-sm is-drawer-close:w-20 is-drawer-open:w-52">
            {/* Sidebar content here */}
            <ul className="menu items-center is-drawer-open:items-start w-full grow space-y-3">
              {sidebarLinks
                .filter((item) => item.roles.includes(role)) // role-based filtering
                .map((item) => (
                  <li key={item.id}>
                    {item.type === "link" ? (
                      <MyLink
                        to={item.to}
                        end={item.to === "/"}
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.label}
                        </span>
                      </MyLink>
                    ) : (
                      <button
                        onClick={handleSignOut}
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-error text-base font-medium text-red-500"
                        data-tip="Sign out"
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.label}
                        </span>
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
