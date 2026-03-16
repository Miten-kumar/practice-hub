interface PageErrorFallbackProps {
  errorMessage: string|undefined;
  reloadFunction: () => void;
}

const PageErrorFallback = ({
  errorMessage,
  reloadFunction,
}: PageErrorFallbackProps) => {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>{errorMessage}</p>

      <button onClick={reloadFunction}>Reload Page</button>
    </div>
  );
};

export default PageErrorFallback;
