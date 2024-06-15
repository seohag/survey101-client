import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

function useCreateSurvey(surveyData, setSurveyUrl) {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { userId } = useUserIdStore();

  async function handleFetchSurvey() {
    try {
      const formData = new FormData();

      formData.append("creator", userId);
      formData.append("title", surveyData.title);
      formData.append("subtitle", surveyData.subtitle);
      formData.append("startButtonText", surveyData.startButtonText);
      formData.append("themeColor", surveyData.themeColor);
      formData.append("buttonShape", surveyData.buttonShape);
      formData.append("animation", surveyData.animation);
      formData.append("endingTitle", surveyData.endingTitle);
      formData.append("endingContent", surveyData.endingContent);
      formData.append("coverImage", surveyData.coverImage);

      if (
        Array.isArray(surveyData.questions) &&
        surveyData.questions.length > 0
      ) {
        surveyData.questions.forEach((question, index) => {
          formData.append(
            `questions[${index}][questionId]`,
            question.questionId,
          );
          formData.append(
            `questions[${index}][questionType]`,
            question.questionType,
          );
          formData.append(
            `questions[${index}][questionText]`,
            question.questionText,
          );

          if (
            Array.isArray(question.options) &&
            question.options.length > 0 &&
            ["textChoice", "imageChoice"].includes(question.questionType)
          ) {
            question.options.forEach((option, optionIndex) => {
              if (question.questionType === "textChoice") {
                formData.append(
                  `questions[${index}][options][${optionIndex}][optionId]`,
                  option.optionId,
                );
                formData.append(
                  `questions[${index}][options][${optionIndex}][text]`,
                  option.text,
                );
              } else if (question.questionType === "imageChoice") {
                formData.append(
                  `questions[${index}][options][${optionIndex}][optionId]`,
                  option.optionId,
                );
                if (option.image instanceof File) {
                  formData.append(
                    `questions[${index}][options][${optionIndex}][image]`,
                    option.image,
                  );
                } else if (option.image) {
                  formData.append(
                    `questions[${index}][options][${optionIndex}][image][imageUrl]`,
                    option.image.imageUrl,
                  );
                  formData.append(
                    `questions[${index}][options][${optionIndex}][image][optionId]`,
                    option.optionId,
                  );
                }
              }
            });
          }
        });
      }

      const response = await fetchData(
        "post",
        `/user/${userId}/surveys`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
      );

      return response.data.url;
    } catch (error) {
      console.error(error);
      return setErrors(error);
    }
  }

  const { mutateAsync: fetchSurvey } = useMutation({
    mutationFn: handleFetchSurvey,
    useErrorBoundary: true,
    onSuccess: (data) => {
      setSurveyUrl(data);
      console.log("설문생성 성공");
      navigate("/dash");
    },
  });

  if (errors) {
    throw errors;
  }

  return fetchSurvey;
}

export default useCreateSurvey;
