const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1000;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    destination: "Kepler-442 b",
    customers: [
        'NASA',
        'SPaceX'
    ],
    upcoming: true,
    success: true,
}

saveLaunch(launch)

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .findOne()
        .sort('-flightNumber')

    if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber
}



async function getAllLaunches() {
    return await launches.find({}, {
        "_id": 0,
        "__v": 0
    })
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.destination,
    })

    if(!planet) {
        throw new Error('No planets found!')
    }


    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        upcoming: true,
        success: true,
        customers: ['NASA', 'SpaceX'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch)
    
}

async function abortLaunchById(launchId) {
    const aborted =  await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    })

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}