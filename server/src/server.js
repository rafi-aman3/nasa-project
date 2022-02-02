const http = require('http');

const app = require('./app');
const {loadAllPlanets} = require('./models/planets.model');
const PORT = process.env.PORT || 8000;


const server = http.createServer(app)

async function startServer () {
    await loadAllPlanets();
    server.listen(PORT, () => {
        console.log(`server listening at ${PORT}`);
    })
}

startServer();