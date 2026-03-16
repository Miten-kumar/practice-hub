import React, { type ReactNode } from "react";
import PagesFallBackUI from "../fallBackUIs/PagesFallBackUI";

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class PageErrorBoundry extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return <PagesFallBackUI />;
    }
    return this.props.children;
  }
}

export default PageErrorBoundry;
