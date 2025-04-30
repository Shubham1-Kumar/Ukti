import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const message = state?.message || "Something went wrong.";
  const redirectTo = state?.redirectTo || "/";
  const redirectLabel = state?.redirectLabel || "Go Home";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => navigate(redirectTo)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {redirectLabel}
        </button>
      </div>
    </div>
  );
};
export default ErrorPage;
