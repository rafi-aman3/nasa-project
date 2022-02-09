const {getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req,res) {

    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req,res) {
    const launch = req.body;

    if(!launch.mission || !launch.launchDate || !launch.destination || !launch.rocket) {
        return res.status(400).json({
            error: "Missing Required value!"
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid Date!"
        })
    }
    await scheduleNewLaunch(launch);
    
    return res.status(201).json(launch);
}

async function htttpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);

    const existLaunch = await existsLaunchWithId(launchId)

    if(!existLaunch) {
        return res.status(404).json({
            error: "Launch Not Found"
        })
    }

    const aborted = await abortLaunchById(launchId);

    if(!aborted) {
        return res.status(400).json({
            error: "Launch not aborted"
        })
    }
    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    htttpAbortLaunch
}