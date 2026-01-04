import NotFoundPage from "./not-found-page";
import StaffRedirectPage from "./staff/staff-redirect-page";
import StudentRedirectPage from "./student/student-redirect-page";
import { useGetMeQuery } from "@/services/auth/queries";

const GlobalRedirect = () => {
  const { data: user, isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return null;

  return isSuccess && user && user.data ? (
    user.data.userType === "student" ? (
      <StudentRedirectPage />
    ) : (
      <StaffRedirectPage />
    )
  ) : (
    <NotFoundPage />
  );
};

export default GlobalRedirect;
