import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function Film() {
    let [film, setFilm] = useState({});

    const url = 'http://localhost:3500/api/films';
    const { id } = useParams();

    useEffect(() => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(film => setFilm(film));
    }, []);

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
            <ul></ul>
        </section>
        <section id="planets">
            <h2>Planets</h2>
            <ul></ul>
        </section>
        </>
    )
}