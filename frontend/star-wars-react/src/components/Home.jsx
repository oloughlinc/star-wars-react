import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {Search} from './Search';

export function Home() {
    const url = 'http://localhost:3500/api/characters';
    let [characters, setCharacters] = useState([]);
    let [charactersCache, setCharactersCache] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res=>res.json())
            .then(characters=>{
                setCharacters(characters);
                setCharactersCache(characters);
            });
    }, []);

    console.log(characters);

    return(
        <>
            <h1>Star Wars Universe Lookup</h1>
            <Search chars={charactersCache} setChars={setCharacters}/>
            <section id="charactersList">
            {characters.map((character) => {
                return (
                    <Link style={{textDecoration: 'none'}} to={`../character/${character.id}`}>
                        <div key={character.id}>{character.name}</div>
                    </Link>
                )
            })}</section>
        </>
    );
}