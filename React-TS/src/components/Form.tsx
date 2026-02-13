import { useState } from "react";

interface formProps{
    name:string;
    mobile:number;
}

export const Form() => {

    const[formData,setFormdata] = useState<formProps>({name:"",mobile:0})

    const function handleSubmit(event: React.FormEvent<HTMLFormElement>){

        const{name,mobile} = event.target;
        setFormdata({...formData,name,mobile})
    }

    return(
        <>
            <h2>Form</h2>

            <form action="">
                <input type="text">Enter Your Name</input>
            </form>
        </>
    )
}