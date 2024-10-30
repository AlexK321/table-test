import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
  const errorHandler = () => {
    // send error to backend
  };

  return (
    <>
      <ErrorBoundary fallback={<div> Something went wrong.</div>} onError={errorHandler}>
        {children}
      </ErrorBoundary>
    </>
  );
};
