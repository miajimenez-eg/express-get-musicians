const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")
const musician = require('./routers/musiciansRouter')

const port = 3000;

app.use(express.json());
app.use('/musicians', musician);
app.use('/musicians/:id', musician);

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})