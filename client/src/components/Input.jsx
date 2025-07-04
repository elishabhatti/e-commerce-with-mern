import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Optional: use any icon library

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`mt-1 w-full px-3 py-2 pr-10 border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-[#110C30] outline-none focus:border-[#110C30] text-md rounded-md`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute  top-4 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
