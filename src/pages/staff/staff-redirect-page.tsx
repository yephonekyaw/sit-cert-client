import { Navigate } from "react-router-dom";

const StaffRedirectPage = () => {
  return <Navigate to="/staff/dashboard/schedules" replace />;
};

export default StaffRedirectPage;
