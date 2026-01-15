import App from "@/App";
import studentRouter from "./student-router";
import staffRouter from "./staff-router";
import NotFoundPage from "@/pages/not-found-page";
import GlobalRedirect from "@/pages/global-redirect";
import RouteProtect from "@/middlewares/route-protect";

const mainRouter = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <RouteProtect types={["staff", "student"]}>
            <GlobalRedirect />
          </RouteProtect>
        ),
      },
      {
        path: "/student",
        children: studentRouter,
      },
      {
        path: "/staff",
        children: staffRouter,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default mainRouter;
