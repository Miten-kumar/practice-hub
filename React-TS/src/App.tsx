import { Card } from "./components/Card"
import { Counter } from "./components/Counter"
import { Form } from "./components/Form"


function App() {

  return (
    <>
      <Card 
        name="Phone"
        price = {50000}/>

      <Card 
        name="IPhone"
        price = {100000}/>

      <div>
        <Counter/>
      </div>

      <div>
        <Form name="manthan"/>
      </div>
    </>
  )
}

export default App
