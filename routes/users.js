const express = require('express');
const routeUsers = express.Router();
const {User} = require('../models/index');
const {Show} = require('../models/index');

routeUsers.use(express.json());

routeUsers.get('/', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

routeUsers.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user){
        res.status(404).json({error: "User not found"});
        return;
    }
    res.status(200).json(user);
});

routeUsers.get('/:id/shows', async (req, res) => {
    const user = await User.findOne({where: {id: req.params.id}, include: Show});
    if (!user){
        res.status(404).json({error: "User not found"});
        return;
    }
    const shows = await user.getShows();
    res.status(200).json(shows);
});

routeUsers.put('/:userid/shows/:showid', async (req, res) => {
    const user = await User.findByPk(req.params.userid);
    if (!user){
        res.status(404).json({error: "User not found"});
        return;
    }
    const show = await Show.findByPk(req.params.showid);
    if (!show){
        res.status(404).json({error: "Show not found"});
        return;
    }
    const updatedUser = await user.addShow(show);
    res.status(201).json(updatedUser);
});

module.exports = routeUsers;