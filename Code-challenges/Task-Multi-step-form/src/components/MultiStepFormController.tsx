// import { useState } from "react"
// import { MultiStepForm } from "./MultiStepForm"

// export interface IFormdata {  
//   firstName?:string,
//   lastName?:string,
//   email?:string,
//   age?:number|null
//   contactNumber?:number|null
//   city?:string,
//   country?:string
// }

// const initialFormData:IFormdata = {
//   firstName:"",
//   lastName:"",
//   email:"",
//   age:0,
//   contactNumber:0,
//   city:"",
//   country:""
// }
// const MultiStepFormController = () => {
//   const [FormData,setFormData] = useState<IFormdata>(initialFormData)
//   const [step,setStep] = useState<number>(0)

//   let currentContent = JSX.Element | undefined

//   switch(step){
//     case 1:
//       currentContent = (
//         <MultiStepForm
//           currentStep = {step}
//           setstep = {setStep}
//           setFormdata = {setFormData}
//           FormData = {{
//             firstname:initialFormData.firstName,
//             lastName :initialFormData.lastName,
//             age:initialFormData.age
//           }}
//           />
//       );
//       break;

//     case 2:
//       currentContent = (
//         <MultiStepForm
//           currentStep = {step}
//           setstep = {setStep}
//           setFormdata = {setFormData}
//           FormData = {{
//             email:initialFormData.email,
//             contactNumber :initialFormData.contactNumber,
//           }}
//           />
//       );
//       break;

//     case 3:
//       currentContent = (
//         <MultiStepForm
//           currentStep = {step}
//           setstep = {setStep}
//           setFormdata = {setFormData}
//           FormData = {{
//             city:initialFormData.city,
//             country :initialFormData.country,
//           }}
//           />
//       );
//       break;

//     default:
//       currentContent = (
//         <h1>form submitted</h1>
//       )
//   }

//   return(
//     <>
//       {currentContent}
//     </>
//   )

// }

// export default MultiStepFormController


import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "../schemas/fromSchema";
import type { FormValues } from "../schemas/fromSchema";

import PersonalInfo from "./PersonalInfo";
import Employment from "./Employment";
import DocumentUpload from "./DocumentUpload";
import Review from "./Review";

export default function MultiStepFormController() {

  const [step, setStep] = useState(1);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      employmentStatus: "unemployed",
      companyName: "",
      skills: [""],
      resume: undefined
    }
  });

  const nextStep = async () => {
    const valid = await methods.trigger();
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo />;

      case 2:
        return <Employment />;

      case 3:
        return <DocumentUpload />;

      case 4:
        return <Review />;

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>

        {renderStep()}

        <div>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Back
            </button>
          )}

          {step < 4 && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}

          {step === 4 && (
            <button type="submit">Submit</button>
          )}
        </div>

      </form>
    </FormProvider>
  );
}
