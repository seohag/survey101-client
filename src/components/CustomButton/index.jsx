import getBrightness from "../../utils/getBrightness";

function CustomButton({ text, themeColor, buttonShape }) {
  const buttonBrightness = getBrightness(themeColor);
  const buttonTextColor = buttonBrightness < 128 ? "#FFFFFF" : "#000000";

  let buttonClassName = "text-white mt-7 px-7 py-2 ";

  if (buttonShape === "rounded") {
    buttonClassName += "rounded";
  } else if (buttonShape === "square") {
    buttonClassName += "square";
  } else {
    buttonClassName += "rounded-full";
  }

  return (
    <button
      className={buttonClassName}
      style={{
        backgroundColor: themeColor,
        color: buttonTextColor,
        padding: "10px 120px",
      }}
    >
      {text}
    </button>
  );
}

export default CustomButton;
