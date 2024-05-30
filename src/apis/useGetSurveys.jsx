import { useQuery } from "@tanstack/react-query";

import fetchData from "../utils/axios";
import useUserIdStore from "../store/useUserIdStore";

function useGetSurveys() {
  const { userId } = useUserIdStore();

  async function getSurveyList() {
    try {
      const response = await fetchData("get", `/user/${userId}/surveys`);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const {
    data: surveys = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: getSurveyList,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: false,
    onError: (err) => {
      console.error("설문 데이터를 불러오는 중 에러가 발생했습니다", err);
    },
  });

  return { surveys, isLoading, isError, error };
}

export default useGetSurveys;
