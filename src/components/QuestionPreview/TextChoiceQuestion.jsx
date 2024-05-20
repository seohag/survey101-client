import CustomButton from "../CustomButton";

function TextChoiceQuestion({ options, styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      {options.map((option) => (
        <CustomButton
          key={option.optionId}
          text={option.text}
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      ))}
    </div>
  );
}

export default TextChoiceQuestion;
