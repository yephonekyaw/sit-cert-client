import StudentApp from "@/apps/student-app";
import RouteProtect from "@/middlewares/route-protect";
import RequirementPage from "@/pages/student/requirements-page";
import StudentRedirectPage from "@/pages/student/student-redirect-page";

const studentRouter = [
  {
    path: "",
    element: (
      <RouteProtect types={["student"]}>
        <StudentApp />
      </RouteProtect>
    ),
    children: [
      {
        index: true,
        element: <StudentRedirectPage />,
      },
      {
        path: "requirements",
        element: <RequirementPage />,
      },
    ],
  },
];

export default studentRouter;
