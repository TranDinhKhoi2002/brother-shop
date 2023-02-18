import React from "react";
import config from "../config";

export const routes = [
  {
    path: config.routes.home,
    component: React.lazy(() => import("../pages/Home/index")),
  },
  {
    path: config.routes.detail,
    component: React.lazy(() => import("../pages/ProductDetail/index")),
  },
  {
    path: config.routes.login,
    component: React.lazy(() => import("../pages/Auth/Login")),
  },
  {
    path: config.routes.signup,
    component: React.lazy(() => import("../pages/Auth/Signup")),
  },
  {
    path: config.routes.forgetPassword,
    component: React.lazy(() => import("../pages/Auth/ForgetPassword")),
  },
  {
    path: config.routes.account,
    component: React.lazy(() => import("../pages/Auth/Account")),
  },
  {
    path: config.routes.productsType,
    component: React.lazy(() => import("../pages/ProductTypes/ProductTypes")),
  },
  {
    path: config.routes.cart,
    component: React.lazy(() => import("../pages/../pages/Cart/index")),
  },
  {
    path: config.routes.search,
    component: React.lazy(() => import("../pages/../pages/Home/Search")),
  },
];
