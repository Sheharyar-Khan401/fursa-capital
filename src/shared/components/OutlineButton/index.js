export const OutlineButton = (props) => {
    const { label, onClick, width = "w-96", icon, prefix = true , hidden = "" } = props || {};
    return (
      <div
        className={`h-11 ${width} ${hidden} rounded-lg items-center border border-solid border-gray-300 justify-center flex bg-white`}
      >
        <button
          onClick={onClick}
          className={`${width} h-11 font-semibold text-base text-gray-700 flex flex-row justify-center items-center`}
        >
          {!!icon && prefix && <img src={icon} alt="" className="mr-2 w-3 h-3" />}
          {label}
          {!!icon && !prefix && (
            <img src={icon} alt="" className="ml-2 w-3 h-3" />
          )}
        </button>
      </div>
    );
  };
  