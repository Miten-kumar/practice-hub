import Dashboard from "./pages/Dashboard"
import LoginForm from "./pages/LoginForm"
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import { PageErrorBoundry } from "./errors/PageErrorBoundry"

function App() {

  // const user = undefined;
  // return <h3>{user.name}</h3>

  return (
    <>
      <PageErrorBoundry>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>welcome</h1>}/>
          <Route path ='/dashboard' element={<Dashboard/>}/>
          <Route path ='/login' element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
      </PageErrorBoundry>
    </>
  )
}

export default App
