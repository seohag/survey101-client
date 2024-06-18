import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Loading from "../../../components/shared/Loading";

describe("Loading 컴포넌트", () => {
  it("정상적으로 렌더링되어야 한다", () => {
    render(<Loading />);
    expect(
      screen.getByText("데이터를 불러오는 중입니다..."),
    ).toBeInTheDocument();
  });
});
