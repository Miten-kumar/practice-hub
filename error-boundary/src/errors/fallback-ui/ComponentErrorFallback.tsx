interface ComponentErrorFallbackProps {
  errorMessage: string |undefined;
  reRenderFunction: () => void;
}

const ComponentErrorFallback = ({
  errorMessage,
  reRenderFunction,
}: ComponentErrorFallbackProps) => {
  return (
    <div>
      <h2>Component failed</h2>
      <p>{errorMessage}</p>

      <button onClick={reRenderFunction}>Retry</button>
    </div>
  );
};

export default ComponentErrorFallback;
