import { Card } from "./components/Card"
import { Counter } from "./components/Counter"
import {Form} from "./components/Form"
import {Form_task} from "./Pages/Form_task"



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
        <Form/>
      </div>

      <br/>
      <br />

      <h1>Form  for Task</h1>
      <div>
        <Form_task/>
      </div>
    </>
  )
}

export default App
