import { Component, type ReactNode } from "react";
import { logError } from "../../services/errorLogger";
import ComponentErrorFallback from "../fallback-ui/ComponentErrorFallback";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ComponentErrorBoundary extends Component<Props, State> {

  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError(error, info.componentStack);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {

    if (this.state.hasError) {
      return (
        <ComponentErrorFallback errorMessage={this.state.error?.message} reRenderFunction={this.resetError}/>
      );
    }

    return this.props.children;
  }
}