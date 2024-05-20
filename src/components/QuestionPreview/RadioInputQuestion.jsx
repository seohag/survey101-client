import CustomButton from "../CustomButton";

function RadioInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex justify-center items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="mr-2">
            <input type="radio" value={rating} className="hidden" />
            <span
              className={`text-3xl ${rating ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
            >
              ★
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CustomButton
          text="다음"
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      </div>
    </div>
  );
}

export default RadioInputQuestion;
