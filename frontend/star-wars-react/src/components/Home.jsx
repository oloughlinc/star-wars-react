import {useState, useEffect} from 'react'

export function Home() {
    const url = 'http://localhost:3500/api/characters';
    let [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res=>res.json())
            .then(characters=>setCharacters(characters));
    }, []);

    console.log(characters);

    return(
        <>
            <h1>It Also Works</h1>
            {characters.map((character) => {
                return (
                    <div>{character.name}</div>
                )
            })}
        </>
    );
}