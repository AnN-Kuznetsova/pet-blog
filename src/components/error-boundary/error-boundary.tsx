import React, { ErrorInfo, ReactNode } from "react";

import { ErrorPage } from "../error-page/error-page";
import type { ErrorType } from "../error-page/error-page";


interface PropsType {
  children?: ReactNode;
}

interface StateType {
  hasError: boolean;
  error: ErrorType | null;
}


export class ErrorBoundary extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: ErrorType) {
    return {
      hasError: true,
      error,
    };
  }

  // componentDidCatch(error: ErrorType, errorInfo: ErrorInfo) {}

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;

    /* if (hasError && error) {
      return <ErrorPage error={error} />;
    } */

    return children;
  }
}
