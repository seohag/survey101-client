import useFormEditorStore from "../../store/useFormEditorStore";
import CustomButton from "../CustomButton";

function TextChoiceField({ options }) {
  const { styleData } = useFormEditorStore();

  return (
    <>
      {options.map((option) => (
        <CustomButton
          key={option.optionId}
          text={option.text}
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      ))}
    </>
  );
}

export default TextChoiceField;
