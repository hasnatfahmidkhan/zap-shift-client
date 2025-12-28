import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import Profile from "../pages/Profile/Profile";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../layouts/DashboardLayout/DashboardLayout";
import Myparcels from "../pages/Dashboard/MyParcels/Myparcels";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../pages/Home/Rider/Rider";
import ApproaveRider from "../pages/Dashboard/ApproveRider/ApproveRider";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries"; // New rider route
import AdminRoute from "./AdminRoute/AdminRoute";
import RiderRoute from "./RiderRoute/RiderRoute"; // Custom route to protect rider pages
import CompletedDeliveries from "../pages/Dashboard/CompletedDevliveries/CompletedDeliveries";
import TrackParcel from "../pages/TrackParcel/TrackParcel";
import DashBoardHome from "../pages/Dashboard/DashboardHome/DashBoardHome";
import AboutUs from "../pages/AboutUs/AboutUs";
import NotFound from "../pages/NotFound/NotFound";
import Root from "../layouts/Root/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json"),
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/track-parcel/:id",
        Component: TrackParcel,
        // loader: () => fetch("/serviceCenters.json"),
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json"),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/forget-password",
        Component: ForgetPassword,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      // Routes accessible to normal users
      {
        path: "/dashboard",
        Component: DashBoardHome,
      },
      {
        path: "/dashboard/my-parcels",
        Component: Myparcels,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },

      // Rider-specific route
      {
        path: "/dashboard/assign-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "/dashboard/completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },

      // Admin-only routes
      {
        path: "/dashboard/approve-rider",
        element: (
          <AdminRoute>
            <ApproaveRider />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
