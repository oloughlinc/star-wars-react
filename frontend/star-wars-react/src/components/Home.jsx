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

    return(
        <>
            <div className='centered'>
            <h1 id="name-main" style={{fontFamily: 'Star Wars', fontSize: '50px'}}>Star Wars Universe Lookup</h1>
            </div>
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