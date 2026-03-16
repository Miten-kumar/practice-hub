import { Component, type ReactNode } from "react";
import { logError } from "../../services/errorLogger";
import GlobalErrorFallback from "../fallback-ui/GlobalErrorFallback";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class GlobalErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError(error, info.componentStack);
  }

  hardReload = () => {
    window.location.replace(window.location.href);
  };

  render() {
    if (this.state.hasError) {
      return (
        <GlobalErrorFallback
          errorMessage={this.state.error?.message}
          reloadFunction={this.hardReload}
        />
      );
    }

    return this.props.children;
  }
}
