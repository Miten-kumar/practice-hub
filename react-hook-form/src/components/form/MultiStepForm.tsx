import { useState } from "react";
import StepPersonalInfo from "./StepPersonalInfo";
import StepAccount from "./StepAccount";
import StepDynamicFields from "./StepDynamicFields";
import StepFileUpload from "./StepFileUpload";
import StepReview from "./StepReview";
import StepNavigation from "./StepNavigation";

const STEPS = ["Personal Info", "Account", "Dynamic Fields", "File Upload", "Review"];
const STORAGE_KEYS = ["personalData", "accountData", "dynamicData"];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleFinalSubmit = () => {
    STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
    alert("Registration complete!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepPersonalInfo onNext={next} />;
      case 1: return <StepAccount onNext={next} onPrev={prev} />;
      case 2: return <StepDynamicFields onNext={next} onPrev={prev} />;
      case 3: return <StepFileUpload onNext={next} onPrev={prev} />;
      case 4: return <StepReview onPrev={prev} onSubmit={handleFinalSubmit} />;
      default: return null;
    }
  };

  return (
    <main aria-label="Multi-step registration form">
      <StepNavigation steps={STEPS} currentStep={currentStep} />
      {renderStep()}
    </main>
  );
};

export default MultiStepForm;