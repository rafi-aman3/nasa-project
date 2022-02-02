const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');

function httpGetAllLaunches(req,res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req,res) {
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
    addNewLaunch(launch);
    
    return res.status(201).json(launch);
}

function htttpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);

    if(!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch Not Found"
        })
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted)


    

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    htttpAbortLaunch
}