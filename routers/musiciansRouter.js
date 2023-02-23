const express = require("express");
const router = express.Router();
const {Musician} = require('../index');
const {sequelize} = require('../db');
const {check, validationResult} = require("express-validator");

//TODO
router.get('/', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// GET request for musicians id
router.get('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician)
})

// express routes
router.use(express.json());
router.post('/', [check("name", "instrument").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    } else {
        // req.body = {name: "Selena Gomez", instrument: "Voice"};
        const newMusician = req.body;
        const createMusician = await Musician.create(newMusician);
        const allMusicians = await Musician.findAll()
        res.json(allMusicians);
    }
})

router.use(express.json());
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    req.body = {name: "Lady Gaga", instrument: "Piano"};
    const newMusician = req.body;
    const updateMusician = await Musician.update(newMusician, { where: { id: id } } );
    const allMusicians = await Musician.findAll()
    res.json(allMusicians);
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    const deleteMusician = await Musician.destroy({ where: { id: id } });
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

module.exports = router;