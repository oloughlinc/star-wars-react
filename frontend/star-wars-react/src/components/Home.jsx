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
            <h1>Star Wars Universe Lookup</h1>
            <section id="charactersList">
            {characters.map((character) => {
                return (
                    <div key={character.id}>{character.name}</div>
                )
            })}</section>
        </>
    );
}