import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema } from "../schemas/formSchema";
import Profetionalinformation from "./Profetionalinformation";
import SkillsInformation from "./SkillsInformation";
import DocumentUpload from "./DocumentUpload";

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(0);

  const steps = [
    <PersonalInformation />,
    <Profetionalinformation />,
    <SkillsInformation />,
    <DocumentUpload />,
  ];
  const methods = useForm({
    resolver: zodResolver(jobApplicationSchema),
  });

  const submitHandler = () => {
    console.log(methods.formState);
  };

  return (
    <div>
      <h1>MultiStepForm </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          {steps[step]}
          <button
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Next
          </button>
          <br />
          <br />
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
}
