import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/auth/Loginpage'
import SignupPage from '../pages/auth/SignupPage'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ConfirmPassword from '../pages/auth/ConfirmPassword'
import Activation from '../pages/auth/Activation'
import RequestActivation from '../pages/auth/RequestActivation'
import Home from '../pages/Home'
import Category from '../pages/Admin/Category'
import ProductDetail from '../components/Helper/ProductDetail'
import HomeLayout from '../layouts/HomeLayout'
import AdminLayout from '../layouts/AdminLayout'
import PrivateRoute from "./privateRoute";
import Admin from "../pages/Admin/Admin";
import SellerLayout from "../layouts/SellerLayout";
import AddProduct from "../pages/Seller/AddProduct";
import ManageProfileLayout from "../layouts/ManageProfileLayout";
import ManageProfile from "../components/ManageProfile/ManageProfile";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },{
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-password/:token",
    element: <ConfirmPassword />,
  },
  {
    path: "/activation/:token",
    element: <Activation />,
  },
  {
    path: "/request-activation",
    element: <RequestActivation />,
  },
  {
    element: <PrivateRoute role="user"/>,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path:"user",
            element:<ManageProfileLayout/>,
            children:[
              {
                path: "my",
                element: <ManageProfile/>,
              },
              {
                path: "orders",
                element: <ManageProfileLayout/>,
              },
              {
                path: "products",
                element: <ManageProfileLayout/>,
              },
            ]
          },
          {
            path: "/product-detail",
            element: <ProductDetail />,
          },
        ],
      },
    ],
  },
  {
    // path:"/admin",
    element: <PrivateRoute role="admin"/>,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },{
            path: "category",
            element: <Category />,
          },
        ],
      },
    ],
  },
  {
    // path:"/seller",
    element: <PrivateRoute role="seller"/>,
    children: [
      {
        path: "/seller",
        element: <SellerLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/seller",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;