import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./examples/basic"))
  },
  {
    path: "/custom",
    component: lazy(() => import("./examples/custom"))
  }
];