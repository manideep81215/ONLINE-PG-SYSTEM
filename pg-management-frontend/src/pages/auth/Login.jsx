import AuthLayout from "../../components/auth/AuthLayout";
import StudentLogin from "./StudentLogin";
import WardenLogin from "./WardenLogin";
import "./Login.css";

const Login = () => {
  
  return (
    
    <AuthLayout>
     
      <div className="login-cards-container">
        <StudentLogin />
        <WardenLogin />
      </div>
    </AuthLayout>
  );
};

export default Login;
