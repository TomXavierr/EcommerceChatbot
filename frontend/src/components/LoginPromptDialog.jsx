import { useNavigate } from "react-router-dom";

const LoginPromptDialog = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Log in to use the chat assistant
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="bg-coral-red text-white py-2 px-4 rounded hover:bg-orange-500"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
          >
            Continue without Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptDialog;
