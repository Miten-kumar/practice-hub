interface cardType {
    name:string;
    price:number;
    isSpecial?: boolean;
}

export function Card({name,price,isSpecial = false} : cardType){

    return(
    <>
        <h1>
            name: {name}
        </h1>
        <h2>
            price:{price} <br/>
            special:{isSpecial}
        </h2>
    </>
    );
}
