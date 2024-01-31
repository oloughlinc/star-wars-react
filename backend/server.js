const { MongoClient } = require('mongodb')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const dbUri = 'mongodb://127.0.0.1:27017';

async function getAll(database, coll) {
    const client = await MongoClient.connect(dbUri);
    const db = client.db(database);
    const collection = db.collection(coll);
    const result = await collection.find().toArray();
    client.close();
    return result;
}

async function getOne(database, coll, id) {
    const client = await MongoClient.connect(dbUri);
    const db = client.db(database);
    const collection = db.collection(coll);
    const result = await collection.findOne({ 'id': +id });
    client.close();
    return result;
}

app.get('/api/planets', async (req, res) => {
    try {
        const planets = await getAll('swapi', 'planets');
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/characters", async (req, res) => {
    try {
        const characters = await getAll('swapi', 'characters');
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/films", async (req, res) => {
    try {
        const films = await getAll('swapi', 'films');
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/characters/:id", async (req, res) => {
    try {
        let id = req.params.id
        const character = await getOne('swapi', 'characters', id);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/films/:id", async (req, res) => {
    try {
        let id = req.params.id
        const character = await getOne('swapi', 'films', id);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/planets/:id", async (req, res) => {
    try {
        let id = req.params.id
        const character = await getOne('swapi', 'planets', id);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/characters/:id/films", async (req, res) => {
    let id = req.params.id
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');
        const collection = db.collection('films_characters');
        const collectionFilms = db.collection('films')
        let filmsFound = collection.find({'character_id': +id}).toArray();
        res.json(filmsFound).end();
        // let filmsSearch = filmsFound.map((film)=> {return {'id':film.film_id}});
        // const result2 = await collectionFilms.find({'$or':filmsSearch}).toArray();
        // client.close();
        // res.json(result2);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3500;
app.listen(port, () => console.log(`server running on port ${port}`));