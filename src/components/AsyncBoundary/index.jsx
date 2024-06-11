import { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Loading from "../shared/Loading";
import ErrorFallback from "../ErrorFallback";

function AsyncBoundary({ children }) {
  return (
    <ErrorBoundary errorFallback={ErrorFallback}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
