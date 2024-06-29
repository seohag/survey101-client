import { useState } from "react";

function RadioInputField({ options }) {
  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  function handleMouseEnter(rating) {
    setHoveredRating(rating);
  }

  function handleMouseLeave() {
    setHoveredRating(null);
  }

  function handleRatingClick(rating) {
    setSelectedRating(rating);
  }

  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div
          key={rating}
          className="mr-2"
          onMouseEnter={() => handleMouseEnter(rating)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleRatingClick(rating)}
          role="presentation"
        >
          <input
            type="radio"
            value={rating}
            checked={selectedRating === rating}
            onChange={() => handleRatingClick(rating)}
            className="hidden"
          />
          <span
            className={`text-3xl cursor-pointer ${
              (hoveredRating !== null && rating <= hoveredRating) ||
              (selectedRating !== null && rating <= selectedRating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        </div>
      ))}
    </div>
  );
}

export default RadioInputField;
