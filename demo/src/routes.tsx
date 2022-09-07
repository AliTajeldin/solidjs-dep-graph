import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./examples/basic"))
  },
  {
    path: "/style",
    component: lazy(() => import("./examples/style"))
  },
  {
    path: "/custom",
    component: lazy(() => import("./examples/custom"))
  },
  {
    path: "/resource",
    component: lazy(() => import("./examples/resource"))
  },
];