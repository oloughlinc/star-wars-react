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
    const result = await collection.findOne({'id': +id});
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

const port = 3500;
app.listen(port, () => console.log(`server running on port ${port}`));