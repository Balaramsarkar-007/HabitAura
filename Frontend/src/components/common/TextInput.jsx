function TextInput({
  label,
  placeholder,
  required = false,
  type = "text",
  value,
  register,
  error,
  iconRequied = false,
  ...props
}) {
  
  return (
    <div className="w-full">
      <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
        {label}
        {required && 
          <span className="text-red-500 text-md ml-1">*</span>
        }
      </label>
      {/* input bar */}
      <div
        className={`
        w-full px-3 py-2 sm:py-2.5
        flex items-center gap-4
        border rounded-lg
        text-sm md:text-base
        placeholder-gray-900
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
        ${error ? "border-red-500" : "border-gray-300"}
      `}
      >
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          {...register}
          {...props}
          autoComplete="off"
          className="w-full bg-transparent text-black placeholder-gray-400 focus:outline-none"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default TextInput;
