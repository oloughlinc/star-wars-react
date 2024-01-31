const { MongoClient } = require('mongodb')
const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('swapi');
        const collection = db.collection('planets');
        const planets = await collection.find().toArray();
        client.close();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/characters", async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('swapi');
        const collection = db.collection('characters');
        const characters = await collection.find().toArray();
        client.close();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/films", async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('swapi');
        const collection = db.collection('films');
        const films = await collection.find().toArray();
        client.close();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3500;
app.listen(port, () => console.log(`server running on port ${3500}`));