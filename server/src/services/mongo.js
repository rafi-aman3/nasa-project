const mongoose = require('mongoose');

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6toow.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connection.once('open', () => {
    console.log('MongoDB  connected!')
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})


async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect(); 
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}