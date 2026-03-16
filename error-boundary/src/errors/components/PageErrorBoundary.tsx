import { Component, type ReactNode } from "react";
import { logError } from "../../services/errorLogger";
import PageErrorFallback from "../fallback-ui/PageErrorFallback";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class PageErrorBoundary extends Component<Props, State> {
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

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <PageErrorFallback
          errorMessage={this.state.error?.message}
          reloadFunction={this.reloadPage}
        />
      );
    }

    return this.props.children;
  }
}
