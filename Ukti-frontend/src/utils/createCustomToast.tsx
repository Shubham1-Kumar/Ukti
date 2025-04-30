import toast from "react-hot-toast";

// for the write page 
export const showToast = (
  message: string,
  bgClass: string,
  textClass: string,
  icon?: string,
  className?: string,
) => {
  toast.custom(
    (t) => (
      <div
        className={`fixed left-80 top-3 transform -translate-y-1/2 z-[9999] ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-lg shadow-lg border ${bgClass} ${textClass} flex items-center space-x-2  ${className}`}
        >
          {icon && <span>{icon}</span>}
          <span>{message}</span>
        </div>
      </div>
    ),
    { duration: 4000 }
  );
};
