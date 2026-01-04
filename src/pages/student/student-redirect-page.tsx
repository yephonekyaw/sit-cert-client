import { Navigate } from "react-router-dom";

const StudentRedirectPage = () => {
  return <Navigate to="/student/requirements" replace />;
};

export default StudentRedirectPage;
