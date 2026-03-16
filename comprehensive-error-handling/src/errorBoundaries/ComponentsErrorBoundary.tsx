import React, { type ReactNode } from "react";
import ComponentsFallBackUI from "../fallBackUIs/ComponentsFallBackUI";

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ComponentsErrorBoundry extends React.Component<
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
      return <ComponentsFallBackUI />;
    }
    return this.props.children;
  }
}

export default ComponentsErrorBoundry;
