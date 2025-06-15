import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
