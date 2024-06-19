import { v4 as uuidv4 } from "uuid";

export function handleAddQuestion(questionType, questions, setQuestions) {
  const newQuestionId = uuidv4();
  let newQuestion;

  switch (questionType) {
    case "textChoice":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "textChoice",
        questionText: "",
        options: [{ optionId: uuidv4(), text: "" }],
      };
      break;
    case "imageChoice":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "imageChoice",
        questionText: "",
        options: [{ optionId: uuidv4(), image: null }],
      };
      break;
    case "textInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "textInput",
        questionText: "",
      };
      break;
    case "emailInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "emailInput",
        questionText: "",
      };
      break;
    case "phoneInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "phoneInput",
        questionText: "",
      };
      break;
    case "dateInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "dateInput",
        questionText: "",
      };
      break;
    case "timeInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "timeInput",
        questionText: "",
      };
      break;
    case "numberInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "numberInput",
        questionText: "",
      };
      break;
    case "rangeInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "rangeInput",
        questionText: "",
      };
      break;
    case "radioInput":
      newQuestion = {
        questionId: newQuestionId,
        questionType: "radioInput",
        questionText: "",
      };
      break;
    default:
      break;
  }

  setQuestions([...questions, newQuestion]);
}

export function handleDeleteQuestion(questionId, questions, setQuestions) {
  if (questions.length <= 1) {
    return;
  }

  const newQuestions = questions.filter(
    (question) => question.questionId !== questionId,
  );

  setQuestions(newQuestions);
}

export function handleAddTextOption(questionId, questions, setQuestions) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId) {
      return {
        ...question,
        options: [...question.options, { optionId: uuidv4(), text: "" }],
      };
    }

    return question;
  });

  setQuestions(newQuestions);
}

export function handleAddImageOption(questionId, questions, setQuestions) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId) {
      return {
        ...question,
        options: [...question.options, { optionId: uuidv4(), image: null }],
      };
    }

    return question;
  });

  setQuestions(newQuestions);
}

export function handleDeleteOption(
  questionId,
  optionId,
  questions,
  setQuestions,
) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId && question.options.length > 1) {
      return {
        ...question,
        options: question.options.filter(
          (option) => option.optionId !== optionId,
        ),
      };
    }

    return question;
  });

  setQuestions(newQuestions);
}

export function handleQuestionTextChange(
  questionId,
  newText,
  questions,
  setQuestions,
) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId) {
      return {
        ...question,
        questionText: newText,
      };
    }

    return question;
  });

  setQuestions(newQuestions);
}

export function handleQuestionOptionChange(
  questionId,
  optionId,
  newOption,
  questions,
  setQuestions,
) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId) {
      return {
        ...question,
        options: question.options.map((option) =>
          option.optionId === optionId
            ? { ...option, text: newOption }
            : option,
        ),
      };
    }

    return question;
  });

  setQuestions(newQuestions);
}

export function handleImageChange(
  event,
  questionId,
  optionId,
  questions,
  setQuestions,
  setErrorMessage,
) {
  const file = event.target.files[0];

  if (!file) return;

  if (file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("지원되는 이미지 형식은 JPEG, PNG, JPG 입니다.");

      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("파일 크기는 5MB 이하로 제한됩니다.");

      return;
    }
  }

  const reader = new FileReader();

  reader.onload = () => {
    const newOptionId = uuidv4();

    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        const newOptions = question.options.map((option) => {
          if (option.optionId === optionId) {
            return { ...option, image: file, optionId: newOptionId };
          }

          return option;
        });

        return { ...question, options: newOptions };
      }

      return question;
    });

    setQuestions(newQuestions);
  };

  setErrorMessage("");
  reader.readAsDataURL(file);
}

export function handleArrowButtonClick(
  questionId,
  direction,
  questions,
  setQuestions,
) {
  const currentQuestionIndex = questions.findIndex(
    (question) => question.questionId === questionId,
  );

  if (direction === "up") {
    if (currentQuestionIndex === 0) return;

    const newQuestions = [...questions];
    const previousQuestionIndex = currentQuestionIndex - 1;
    [newQuestions[currentQuestionIndex], newQuestions[previousQuestionIndex]] =
      [newQuestions[previousQuestionIndex], newQuestions[currentQuestionIndex]];

    setQuestions(newQuestions);
  } else if (direction === "down") {
    if (currentQuestionIndex === questions.length - 1) return;

    const newQuestions = [...questions];
    const nextQuestionIndex = currentQuestionIndex + 1;
    [newQuestions[currentQuestionIndex], newQuestions[nextQuestionIndex]] = [
      newQuestions[nextQuestionIndex],
      newQuestions[currentQuestionIndex],
    ];

    setQuestions(newQuestions);
  }
}

export function handleOptionOrderChange(
  questionId,
  optionId,
  direction,
  questions,
  setQuestions,
) {
  const newQuestions = questions.map((question) => {
    if (question.questionId === questionId) {
      const optionIndex = question.options.findIndex(
        (opt) => opt.optionId === optionId,
      );

      if (optionIndex === -1) return question;

      const newOptions = [...question.options];

      if (direction === "up" && optionIndex > 0) {
        const temp = newOptions[optionIndex - 1];
        newOptions[optionIndex - 1] = newOptions[optionIndex];
        newOptions[optionIndex] = temp;
      } else if (direction === "down" && optionIndex < newOptions.length - 1) {
        const temp = newOptions[optionIndex + 1];
        newOptions[optionIndex + 1] = newOptions[optionIndex];
        newOptions[optionIndex] = temp;
      }

      return { ...question, options: newOptions };
    }

    return question;
  });

  setQuestions(newQuestions);
}
