function Button({ children, className, ...other }) {
  return (
    <button className={`px-6 py-3 bg-[#000] text-white rounded-[4px] uppercase text-sm ${className}`} {...other}>
      {children}
    </button>
  );
}

export default Button;
