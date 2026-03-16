interface Props {
  steps: string[];
  currentStep: number;
}

const StepNavigation = ({ steps, currentStep }: Props) => {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <nav aria-label="Form progress">
      <div
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
        style={{ background: "#e0e0e0", borderRadius: 4, marginBottom: 16 }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: 6,
            background: "#2563eb",
            borderRadius: 4,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <ol style={{ display: "flex", gap: 16, listStyle: "none", padding: 0 }}>
        {steps.map((step, i) => (
          <li
            key={step}
            aria-current={i === currentStep ? "step" : undefined}
            style={{ fontWeight: i === currentStep ? "bold" : "normal", opacity: i > currentStep ? 0.4 : 1 }}
          >
            {i < currentStep ? "✓ " : `${i + 1}. `}
            {step}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepNavigation;