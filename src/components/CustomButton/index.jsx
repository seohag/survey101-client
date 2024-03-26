import { getBrightness } from "../../utils/utils";

function CustomButton({ text, themeColor, buttonShape, onClick }) {
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
        width: "350px",
        height: "50px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CustomButton;
