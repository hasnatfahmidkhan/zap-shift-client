import {
  House,
  LogOut,
  Package,
  PanelRightClose,
  ReceiptText,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Logo from "../../components/Logo/Logo";
import MyLink from "../../components/MyLink/MyLink";

const DashboardLayout = () => {
  const { signOutFunc } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOutFunc();
      toast.success("Sign Out Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-100 py-3.5">
            <label
              htmlFor="sidebar"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost mx-2"
            >
              {/* Sidebar toggle icon */}
              <PanelRightClose size={21} />
            </label>
            <div className="">
              <Logo />
            </div>
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
              {/* Home */}
              <li>
                <MyLink
                  end
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  {/* Home icon */}
                  <House size={20} />

                  <span className="is-drawer-close:hidden">Homepage</span>
                </MyLink>
              </li>

              {/* My Parcels */}
              <li>
                <MyLink
                  to={"/dashboard/my-parcels"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  {/* Package icon */}
                  <Package size={20} />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </MyLink>
              </li>

              {/* Payment History */}
              <li>
                <MyLink
                  to={"/dashboard/payment-history"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  {/* Receipt icon */}
                  <ReceiptText size={20} />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </MyLink>
              </li>

              {/* Sign out */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-error text-base font-medium text-red-500"
                  data-tip="Sign out"
                >
                  {/* Settings icon */}
                  <LogOut size={20} />
                  <span className="is-drawer-close:hidden">Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
