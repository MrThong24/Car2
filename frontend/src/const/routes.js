/* eslint-disable object-curly-newline */
import {
  DetailProduct,
  EditProduct,
  HomePage,
  ManagerProduct,
  NotFound,
} from "../pages";

export default [
  {
    path: ["/managerProduct"],
    exact: true,
    component: ManagerProduct,
  },
  {
    path: ["/managerProduct/editProduct/:id"],
    component: EditProduct,
  },
  {
    path: ["/homePage"],
    exact: true,
    component: HomePage,
  },
  {
    path: ["/homePage/detailProduct/:id"],
    component: DetailProduct,
  },
  {
    path: ["/404"],
    component: NotFound,
  },
  {
    path: "*",
    component: NotFound,
  },
];
