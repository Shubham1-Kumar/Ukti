import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const message = state?.message || "Action completed successfully!";
  const redirectTo = state?.redirectTo || "/";
  const redirectLabel = state?.redirectLabel || "Go Home";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-green-700 mb-2">Success</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => navigate(redirectTo)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {redirectLabel}
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
