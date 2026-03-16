interface GLobalErrorFallbackProps {
  errorMessage: string|undefined;
  reloadFunction: () => void;
}

const GLobalErrorFallback = ({
  errorMessage,
  reloadFunction,
}: GLobalErrorFallbackProps) => {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>{errorMessage}</p>

      <button onClick={reloadFunction}>Hard Reload</button>
    </div>
  );
};

export default GLobalErrorFallback;
