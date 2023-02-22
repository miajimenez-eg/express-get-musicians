const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// GET request for musicians id
app.get('/musicians/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician)
})

// express routes
app.use(express.json());
app.post('/musicians', async (req, res) => {
    req.body = {name: "Selena Gomez", instrument: "Voice"};
    const newMusician = req.body;
    const createMusician = await Musician.create(newMusician);
    const allMusicians = await Musician.findAll()
    res.json(allMusicians);
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})