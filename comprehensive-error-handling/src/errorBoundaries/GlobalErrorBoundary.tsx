import React, { type ReactNode } from "react";
import GlobalFallBackUI from "../fallBackUIs/GlobalFallBackUI";

interface ErrorboundaryProp {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GlobalErrorBoundary extends React.Component<
  ErrorboundaryProp,
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
      return <GlobalFallBackUI />;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
