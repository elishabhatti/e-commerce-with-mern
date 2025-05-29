const Input = ({ label, name, type = "text", value, onChange, hint }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="mt-1 w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-bg-[#110C30] outline-none focus:border-bg-[#110C30] text-md"
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

export default Input