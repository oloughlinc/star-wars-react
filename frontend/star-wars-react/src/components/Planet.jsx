import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function Planet() {
    let [planet, setPlanet] = useState({});

    const url = 'http://localhost:3500/api/planets';
    const { id } = useParams();

    useEffect(() => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(planet => setPlanet(planet));
    }, []);

    return (
        <>
        <h1 id="name">{planet.name}</h1>
        <section id="generalInfo">
            <p>Population: <span id="population"></span>{planet.population}</p>
            <p>Climate: <span id="climate"></span>{planet.climate}</p>
            <p>Diameter: <span id="diameter"></span>{planet.diameter} cm</p>
            <p>Gravity: <span id="gravity"></span>{planet.gravity}</p>
        </section>
        <section id="characters">
            <h2>Characters</h2>
            <p><span id="character"></span></p>
        </section>
        <section id="films">
            <h2>Films appeared in</h2>
            <ul></ul>
        </section>
        </>
    )
}