import CustomButton from "../CustomButton";

function CoverSection({ surveyData, onStartButtonClick }) {
  const {
    title,
    subtitle,
    coverImage,
    startButtonText,
    themeColor,
    buttonShape,
  } = surveyData;

  return (
    <div className="cover-section flex flex-col items-center">
      <h1 className="text-center text-xl">{title}</h1>
      <h3 className="text-center">{subtitle}</h3>
      {coverImage && coverImage.imageUrl && (
        <img
          src={
            typeof coverImage.imageUrl === "string"
              ? coverImage.imageUrl
              : URL.createObjectURL(coverImage.imageUrl)
          }
          alt="Cover"
          className="max-w-80 h-auto mt-4"
        />
      )}
      <CustomButton
        themeColor={themeColor}
        buttonShape={buttonShape}
        text={startButtonText}
        onClick={onStartButtonClick}
      />
    </div>
  );
}

export default CoverSection;
