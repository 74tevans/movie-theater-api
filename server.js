const {db} = require("./db/connection");
const port = 3000;
const express = require("express");
const app = express();
const routeUsers = require('./routes/users');
const routeShows = require('./routes/shows');

app.use('/users', routeUsers);
app.use('/shows', routeShows);

app.listen(port, async () => {
    await db.sync();
    console.log(`Listening at http://localhost:${port}`);
});
