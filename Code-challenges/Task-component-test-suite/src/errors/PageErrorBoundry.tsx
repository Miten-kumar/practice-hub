import React, { type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";


interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;

}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class PageErrorBoundry extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(){
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
    Sentry.captureException(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ||
        <>
          <h1>Something went wrong...</h1>
          <h1>Do Refresh...</h1>
        </>
      );
    }

    return this.props.children;
  }
}
