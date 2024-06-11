import { Component } from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("에러가 발생했습니다:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, errorFallback: ErrorFallback } = this.props;

    if (hasError && error !== null) {
      return <ErrorFallback error={error} resetError={this.resetError} />;
    }

    return children;
  }
}

function withNavigate(Components) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Components {...props} navigate={navigate} />;
  };
}

export default withNavigate(ErrorBoundary);
