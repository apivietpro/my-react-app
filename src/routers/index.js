import Home from "../pages/Home";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProduuctDetails";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import UpdateCustomer from "../pages/UpdateCustomer";
import AuthRequired from "../shared/AuthRequired";

export default [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Category-:id",
    element: Category,
  },
  {
    path: "/ProductDetails-:id",
    element: ProductDetails,
  },
  {
    path: "/Search",
    element: Search,
  },
  {
    path: "/Cart",
    element: Cart,
  },
  {
    path: "/Register",
    element: Register,
  },
  {
    path: "/Login",
    element: Login,
  },
  {
    path: "/Success",
    element: Success,
  },
  {
    path: "/Orders",
    element: AuthRequired.CheckNotLogged(Orders),
  },
  {
    path: "/OrderDetails-:id",
    element: OrderDetails,
  },
  {
    path: "/UpdateCustomer-:id",
    element: AuthRequired.CheckNotLogged(UpdateCustomer),
  },
  {
    path: "*",
    element: NotFound,
  },
];
