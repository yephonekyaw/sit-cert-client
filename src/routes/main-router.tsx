import App from "@/App";
import studentRouter from "./student-router";
import staffRouter from "./staff-router";
import NotFoundPage from "@/pages/not-found-page";
import GlobalRedirect from "@/pages/global-redirect";

const mainRouter = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <GlobalRedirect />, // put this element in the route-protect component to prevent logged-out users
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
