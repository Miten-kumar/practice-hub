const Child = ({increment}:{increment :() => void}) => {

    return(
        <>
            <button onClick={increment}>click</button>
        </>
    )
}

export default Child;