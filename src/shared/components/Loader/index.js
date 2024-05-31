const Loader = ({ stroke = "text-[#59276C]", className}) => (
    <svg
      className={`animate-spin h-6 w-6 ${stroke} mx-auto my-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  
  export default Loader;
  