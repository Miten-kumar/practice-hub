import { useState } from "react"

export function Counter() {

    const[count,setCount] = useState <number>(0)

    return(
        <>
            count:{count}
            <button 
                onClick={() => setCount((c) => c+1)}>
            click me
            </button>
        </>
    )
}