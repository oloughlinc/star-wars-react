import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

export function Planet() {
    let [planet, setPlanet] = useState({});
    let [characters, setCharacters] = useState([]);
    let [films, setFilms] = useState([]);

    const url = 'http://localhost:3500/api/planets';
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${url}/${id}`)
                .then(res => res.json())
                .then(planet => setPlanet(planet));

            await fetch(`${url}/${id}/characters`)
                .then(res => res.json())
                .then(chars => setCharacters(chars));

            await fetch(`${url}/${id}/films`)
                .then(res => res.json())
                .then(films => setFilms(films));
        }
        fetchData()

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <h1 id="name">{planet.name}</h1>
            <section id="generalInfo">
                <p>Population: <span id="population"></span>{planet.population}</p>
                <p>Climate: <span id="climate"></span>{planet.climate}</p>
                <p>Diameter: <span id="diameter"></span>{planet.diameter} cm</p>
                <p>Gravity: <span id="gravity"></span>{planet.gravity}</p>
            </section>
            <div className='animate-me'>
            <section id="characters">
                <h2>Characters</h2>
                {characters.map(((c) => <ul><Link to={`../character/${c.id}`}>{c.name}</Link></ul>))}
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                {films.map(((film) => <ul><Link to={`../film/${film.id}`}>{film.title}</Link></ul>))}
            </section>
            </div>
        </>
    )
}