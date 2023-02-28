function Title({ children, className }) {
  return <h4 className={`text-[1.2rem] leading-8 font-medium uppercase ${className}`}>{children}</h4>;
}

export default Title;
