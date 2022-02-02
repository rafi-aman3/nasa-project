const express = require('express');

const {
    httpGetAllLaunches, httpAddNewLaunch, htttpAbortLaunch
} = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', htttpAbortLaunch )

module.exports = launchesRouter