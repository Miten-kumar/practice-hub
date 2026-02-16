import { useEffect, useState } from 'react'

import './App.css'

interface apiData {
  id:number;
  title:string;
  body:string;
}

function App() {
  
  const[data,setData] = useState<apiData | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try{
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1")
      const jsonData : apiData = await res.json()
      setData(jsonData)
    }
    catch (err) {
      console.log("error in fetch data",err)
    }
  }

  fetchData()
},[data])

  return (
    <>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </>
  )
}

export default App
