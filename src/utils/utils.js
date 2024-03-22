export function validateInput(fieldName, value) {
  switch (fieldName) {
    case "title":
      if (value.length > 30) {
        return "설문 제목은 20자 이하로 입력하세요.";
      }
      break;
    case "subtitle":
      if (value.length > 20) {
        return "부제목은 30자 이하로 입력하세요.";
      }
      break;
    case "startButtonText":
      if (value.length > 15) {
        return "설문 시작 버튼 텍스트는 15자 사이로 입력하세요.";
      }
      break;
    case "questionText":
      if (value.length > 30) {
        return "질문 제목은 30자 이하로 입력하세요.";
      }
      break;
    case "optionText":
      if (value.length > 20) {
        return "옵션은 20자 이하로 입력하세요.";
      }
      break;
    default:
      return null;
  }

  return null;
}

export function getBrightness(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
