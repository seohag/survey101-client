import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

function ErrorFallback({ error, resetError }) {
  return <div>
    <div>에러 발생했습니다: {error.message}</div>
    <button onClick={resetError}>다시 시도</button>
  </div>;
}

const ProblemChild = () => {
  throw new Error("테스트 에러");
};

describe("ErrorBoundary 컴포넌트", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("자식 컴포넌트를 정상적으로 렌더링합니다", () => {
    render(
      <Router>
        <ErrorBoundary errorFallback={ErrorFallback}>
          <div>Child Component</div>
        </ErrorBoundary>
      </Router>,
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("에러가 발생했을 때 ErrorFallback을 렌더링합니다", () => {
    render(
      <Router>
        <ErrorBoundary errorFallback={ErrorFallback}>
          <ProblemChild />
        </ErrorBoundary>
      </Router>,
    );

    expect(
      screen.getByText(/에러 발생했습니다: 테스트 에러/i),
    ).toBeInTheDocument();
  });
});
