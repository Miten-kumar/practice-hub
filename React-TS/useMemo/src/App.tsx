import SearchBox from "./components/SearchBox"

function App () {

const dummyUsers = [
    { id: 1, name: "Manthan" },
    { id: 2, name: "manush" },
    { id: 3, name: "Tejash" },
    { id: 4, name: "John" },
    { id: 5, name: "carl" }
  ];

  return(
    <>
    <SearchBox users = {dummyUsers}/>
    </>
  )
}

export default App;