const http = require('http');
require('dotenv').config();

const app = require('./app');
const {loadAllPlanets} = require('./models/planets.model');
const {mongoConnect} = require('./services/mongo')
const {loadLaunchesData} = require('./models/launches.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer () {
    await mongoConnect();
    await loadLaunchesData();
    await loadAllPlanets();
    server.listen(PORT, () => {
        console.log(`server listening at ${PORT}`);
    })
}

startServer();