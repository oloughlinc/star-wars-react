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
        const collection = db.collection("films_characters");
        const collectionFilms = db.collection('films')
        let filmsFound = await collection.find({'character_id': +id}).toArray();
        let filmsSearch = filmsFound.map((film)=> {return {'id':film.film_id}});
        const result = await collectionFilms.find({'$or':filmsSearch}).toArray();
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
        const collection = db.collection("films_planets");
        const collectionFilms = db.collection('films')
        let filmsFound = await collection.find({'planet_id': +id}).toArray();
        let filmsSearch = filmsFound.map((planet)=> {return {'id':planet.film_id}});
        const result = await collectionFilms.find({'$or':filmsSearch}).toArray();
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
        const collection = db.collection("films_planets");
        const collectionFilms = db.collection('planets')
        let planetsFound = await collection.find({'film_id': +id}).toArray();
        let planetsSearch = planetsFound.map((planet)=> {return {'id':planet.planet_id}});
        const result = await collectionFilms.find({'$or':planetsSearch}).toArray();
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
        const collection = db.collection("films_characters");
        const collectionChars = db.collection('characters')
        let charsFound = await collection.find({'film_id': +id}).toArray();
        let charsSearch = charsFound.map((chars)=> {return {'id':chars.character_id}});
        const result = await collectionChars.find({'$or':charsSearch}).toArray();
        client.close();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// uhh?
app.get("/api/planets/:id/characters", async (req, res) => {
    let id = req.params.id;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('swapi');

        // step 1: planets - films
        const collection = db.collection("films_planets");
        const collectionFilms = db.collection('films')

        let filmsFound = await collection.find({'planet_id': +id}).toArray();
        let filmsSearch = filmsFound.map((planet)=> {return {'id':planet.film_id}});
        const result = await collectionFilms.find({'$or':filmsSearch}).toArray();
        
        // step 2: films - chars
        let filmIds = result.map((item) => { return {'film_id': item.id}});
        const collection2 = db.collection("films_characters");
        const collectionChars = db.collection('characters')

        let charsFound = await collection2.find({'$or': filmIds}).toArray();
        let charsSearch = charsFound.map((chars)=> {return {'id':chars.character_id}});
        const result2 = await collectionChars.find({'$or':charsSearch}).toArray();

        //step 3: filter result
        

        client.close();
        res.json(result2);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3500;
app.listen(port, () => console.log(`server running on port ${port}`));