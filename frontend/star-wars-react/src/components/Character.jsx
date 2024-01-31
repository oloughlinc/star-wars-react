import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function Character() {
    let [character, setCharacter] = useState({});

    const url = 'http://localhost:3500/api/characters';
    const { id } = useParams();

    useEffect(() => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(character => setCharacter(character));
    }, []);

    return (
        <>
        <h1 id="name">{character.name}</h1>
        <section id="generalInfo">
            <p>Height: <span id="height"></span>{character.height} cm</p>
            <p>Mass: <span id="mass"></span>{character.mass} kg</p>
            <p>Born: <span id="birth_year"></span>{character.birth_year}</p>
        </section>
        <section id="planets">
            <h2>Homeworld</h2>
            <p><span id="homeworld"></span></p>
        </section>
        <section id="films">
            <h2>Films appeared in</h2>
            <ul></ul>
        </section>
        </>
    )
}