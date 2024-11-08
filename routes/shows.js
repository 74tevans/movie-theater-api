const express = require('express');
const routeShows = express.Router();
const {Show} = require('../models/index');
const {User} = require('../models/index');

routeShows.use(express.json());

routeShows.get('/', async (req, res) => {
    if (req.query.genre){
        const shows = await Show.findAll({where: {genre: req.query.genre}});
        res.status(200).json(shows);
        return;
    }
    const shows = await Show.findAll();
    if (!shows){
        res.status(404).json({error: "Show not found"});
        return;
    }
    res.status(200).json(shows);
});

routeShows.get('/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    if (!show){
        res.status(404).json({error: "Show not found"});
        return;
    }
    res.status(200).json(show);
});

routeShows.get('/:id/users', async (req, res) => {
    const show = await Show.findOne({where: {id: req.params.id}, include: User});
    if (!show){
        res.status(404).json({error: "Show not found"});
        return;
    }
    const users = await show.getUsers();
    if (!users){
        res.status(404).json({error: "No users found"});
        return;
    }
    res.status(200).json(users);
});

routeShows.put('/:id', async (req, res) => {
    const show = await Show.update({available: req.body.available}, {where: {id: req.params.id}});
    if (!show){
        res.status(404).json({error: "Show not found"});
        return;
    }
    res.status(200).json(show);
});

routeShows.delete('/:id', async (req, res) => {
    const show = await Show.destroy({where: {id: req.params.id}});
    if (!show){
        res.status(404).json({error: "Show not found"});
        return;
    }
    res.status(200).json(show);
});

module.exports = routeShows;