import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  BrowserRouter,
  useNavigate as useNavigateActual,
} from "react-router-dom";
import ErrorFallback from "../../components/ErrorFallback";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe("ErrorFallback 컴포넌트", () => {
  const setup = (error) => {
    const resetError = vi.fn();
    return render(
      <BrowserRouter>
        <ErrorFallback error={error} resetError={resetError} />
      </BrowserRouter>,
    );
  };

  it("401 에러 메시지를 렌더링하고 로그인 페이지로 이동한다", () => {
    const navigate = vi.fn();
    vi.mocked(useNavigateActual).mockReturnValue(navigate);

    setup({ response: { status: 401 }, message: "Unauthorized" });
    expect(screen.getByText("로그인 해주세요.")).toBeInTheDocument();
    expect(
      screen.getByText("접근 권한이 없습니다. 로그인 후 다시 시도해주세요."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("로그인하러 가기"));
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("404 에러 메시지를 렌더링한다", () => {
    setup({ response: { status: 404 }, message: "Not Found" });
    expect(screen.getByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();
    expect(
      screen.getByText("요청한 페이지를 찾을 수 없습니다. URL을 확인해주세요."),
    ).toBeInTheDocument();
  });

  it("405 에러 메시지를 렌더링한다", () => {
    setup({ response: { status: 405 }, message: "Method Not Allowed" });
    expect(screen.getByText("존재하지 않는 설문입니다.")).toBeInTheDocument();
    expect(screen.getByText("이미 삭제된 설문입니다.")).toBeInTheDocument();
  });

  it("500 에러 메시지를 렌더링한다", () => {
    setup({ response: { status: 500 }, message: "Internal Server Error" });
    expect(screen.getAllByText("서버 측 에러입니다.")).toHaveLength(2);
  });

  it("네트워크 에러 메시지를 렌더링한다", () => {
    setup({ message: "Network Error" });
    expect(screen.getByText("네트워크 에러입니다.")).toBeInTheDocument();
    expect(
      screen.getByText("네트워크 연결을 확인하고 다시 시도해주세요."),
    ).toBeInTheDocument();
  });

  it("401 이외의 에러에서는 버튼 클릭 시 resetError를 호출한다", () => {
    const resetError = vi.fn();
    render(
      <BrowserRouter>
        <ErrorFallback
          error={{ message: "Unknown Error" }}
          resetError={resetError}
        />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText("다시 시도"));
    expect(resetError).toHaveBeenCalled();
  });
});
