export const SwitchAbleBtn = (props) => {
  const {
    label,
    onClick,
    width = "w-32",
    hidden = "",
    color = true, // for the  background color (true/false)
    yinc = "bg-primary", // for the  background color of yes (bg-primary)
    ninc = "bg-primary", // for the  background color of no (bg-red)
    value = -1,
    getValue,
    yesLabel = "Yes",
    noLabel = "No",
  } = props || {};
  return (
    <div className={`${hidden} ${color ? "py-0.5" : ""}`}>
      <div
        onClick={() => getValue(true)}
        className={`px-5 ${
          value == true
            ? `${yinc} text-white`
            : "bg-white text-gray-700"
        } font-semibold rounded-l-lg border-r text-center border inline cursor-pointer py-3`}
      >
        {yesLabel}
      </div>
      <div
        onClick={() => getValue(false)}
        className={`px-5 font-semibold ${
          !value
            ? `${ninc} text-white`
            : "bg-white text-gray-700"
        } text-gray-700 text-center rounded-r-lg border inline cursor-pointer py-3`}
      >
        {noLabel}
      </div>
    </div>
  );
};
