import Counter from "../components/Counter"
import UserList from "../components/UserList"
import SearchList from "../components/SearchList"
import { ComponenetErrorBoundry } from "../errors/ComponentErrorBoundry"
import { useState } from "react"

const Dashboard = () => {
  const [crash,setCrash] = useState<boolean>(false)

  if(crash)
      throw new Error ("page crashing..")

  return (
    <div>
     

      <ComponenetErrorBoundry>
        <Counter />
      </ComponenetErrorBoundry>

      <ComponenetErrorBoundry>
        <UserList/>
      </ComponenetErrorBoundry>

      <ComponenetErrorBoundry>
        <SearchList items={["manthan","manush"]}/>
      </ComponenetErrorBoundry>
     

    <button onClick= {()=> setCrash(true)}>
      do crash 
    </button> 
    </div>
  )
}

export default Dashboard
