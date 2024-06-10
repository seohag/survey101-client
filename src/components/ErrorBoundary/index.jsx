import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("에러가 발생했습니다:", error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <h1>
          설문 데이터를 불러오는 중 에러가 발생했습니다.<br></br>
          잠시 후 다시 시도해주세요!
        </h1>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
