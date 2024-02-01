import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

export function Character() {
    let [character, setCharacter] = useState({});
    let [homeWorld, setHomeWorld] = useState({});
    let [films, setFilms] = useState([]);

    const url = 'http://localhost:3500/api/characters';
    const urlPlanet = 'http://localhost:3500/api/planets';
    const { id } = useParams();

    useEffect(() => {
        // need to get character first, so we can find homeworld
        const fetchData = async () => {
          let searchChar = await fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(character => {
                setCharacter(character);
                return character;
            });
          await fetch(`${urlPlanet}/${searchChar.homeworld}`)
            .then(res => res.json())
            .then(planet => setHomeWorld(planet));
          await fetch(`${url}/${id}/films`)
            .then(res => res.json())
            .then(films => setFilms(films));
        }
      
        // call the function
        fetchData()
          .catch(console.error);
      }, [])

      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
        <h1 id="name">{character.name}</h1>
        <section id="generalInfo">
            <p>Height: <span id="height"></span>{character.height} cm</p>
            <p>Mass: <span id="mass"></span>{character.mass} kg</p>
            <p>Born: <span id="birth_year"></span>{character.birth_year}</p>
        </section>
        <div className='animate-me'>
        <section id="planets">
            <h2>Homeworld</h2>
            <Link to={`../planet/${character.homeworld}`}>
            <p><span id="homeworld">{homeWorld.name}</span></p>
            </Link>
        </section>
        <section id="films">
            <h2>Films appeared in</h2>
                {films.map(((film)=><ul><Link to={`../film/${film.id}`}>{film.title}</Link></ul>))}
        </section>
        </div>
        </>
    )
}