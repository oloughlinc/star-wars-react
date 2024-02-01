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
    let id = req.params.id;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');
        let filmIds = await db.collection('films_characters').find({'character_id': +id}).toArray();
        filmIds = filmIds.map((film)=> {return {'id':film.film_id}});
        const result = filmIds.length ? await db.collection('films').find({'$or':filmIds}).toArray():[];
        client.close();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/planets/:id/films", async (req, res) => {
    let id = req.params.id;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');
        let filmIds = await db.collection('films_planets').find({'planet_id': +id}).toArray();
        filmIds = filmIds.map((planet)=> {return {'id':planet.film_id}});
        let result = filmIds.length ? await db.collection('films').find({'$or':filmIds}).toArray():[];
        client.close();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/films/:id/planets", async (req, res) => {
    let id = req.params.id;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');
        let planetIds = await db.collection('films_planets').find({'film_id': +id}).toArray();
        planetIds = planetIds.map((planet)=> {return {'id':planet.planet_id}});
        let result = planetIds.length ? await db.collection('planets').find({'$or':planetIds}).toArray():[];
        client.close();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/films/:id/characters", async (req, res) => {
    let id = req.params.id;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');
        let charIds = await db.collection('films_characters').find({'film_id': +id}).toArray()
        charIds = charIds.map((chars)=> {return {'id':chars.character_id}});
        let result = charIds.length ? await db.collection('characters').find({'$or':charIds}).toArray():[];
        client.close();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/planets/:id/characters", async (req, res) => {
    let id = req.params.id;
    try {
        let allChars = await getAll('swapi', 'characters');
        let result = allChars.filter(character => character.homeworld === +id)
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3500;
app.listen(port, () => console.log(`server running on port ${port}`));