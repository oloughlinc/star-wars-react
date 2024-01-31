import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

export function Film() {
    let [film, setFilm] = useState({});
    let [characters, setCharacters] = useState([]);
    let [planets, setPlanets] = useState([]);

    const url = 'http://localhost:3500/api/films';
    const { id } = useParams();

    useEffect(() => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(film => setFilm(film));
    }, []);

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
          await fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(film => setFilm(film));
          await fetch(`${url}/${id}/characters`)
            .then(res => res.json())
            .then(res => setCharacters(res));
          await fetch(`${url}/${id}/planets`)
            .then(res => res.json())
            .then(res => setPlanets(res));
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])

    return (
        <>
        <h1 id="name">{film.title}</h1>
        <section id="generalInfo">
            <div id="crawl">{film.opening_crawl}</div>
            <p>Episode: <span id="episode">{film.episode_id}</span></p>
            <p>Director: <span id="director">{film.director}</span></p>
            <p>Release Date: <span id="release">{film.release_date}</span></p>
            <p>Producer: <span id="producer">{film.producer}</span></p>
        </section>
        <section id="characters">
            <h2>Characters</h2>
            {characters.map(((item)=><ul><Link to={`../character/${item.id}`}>{item.name}</Link></ul>))}
        </section>
        <section id="planets">
            <h2>Planets</h2>
            {planets.map(((item)=><ul><Link to={`../planet/${item.id}`}>{item.name}</Link></ul>))}
        </section>
        </>
    )
}