#!/usr/bin/env node

const axios = require('axios');
const moment = require('moment');
const RandExp = require('randexp');
const _ = require('lodash');

const API_URL = 'http://localhost:8080/api';

// setup
const CAR_PLATE_RANDEXP = new RandExp(/[A-Z]{2}[0-9]{3}[A-Z]{2}/);
const MAX_OPERATION_PER_ROUND = 20;
const ROUNDS_DELAY_IN_SECONDS = 8;
const _DB = {};

const _executeTimes = times => callback => {
  Array.from(new Array(parseInt(times))).forEach(callback);
};

const log = msg => {
  console.info(`[${moment().toISOString()}] :: ${msg}`);
};

const enterCar = lot => {
  const url = `${API_URL}/lots/${lot.id}/entries`;
  axios
    .put(url, {
      carPlate: CAR_PLATE_RANDEXP.gen(),
    })
    .then(({ data }) => {
      log(`Car ${data.carPlate} got IN ${lot.name}`);
      _DB[lot.id][data.id] = moment();
    })
    .catch(data => {
      log(`PUT ${url} caused an error`);
      log(data);
    });
};

const exitCar = lot => entryId => {
  const url = `${API_URL}/lots/${lot.id}/entries/${entryId}`;
  axios
    .patch(url, {})
    .then(({ data }) => {
      log(`Car ${data.carPlate} got OUT from ${lot.name}`);
      _.unset(_DB, [lot.id, entryId]);
    })
    .catch(data => {
      log(`PATCH ${url} caused an error`);
      log(data);
    });
};

const run = lot => {
  const freeSpotsRatio = lot.spots < lot.status.carCount ? 0 : (lot.spots - lot.status.carCount) / lot.spots;
  const maxCarsIn = MAX_OPERATION_PER_ROUND * freeSpotsRatio;
  const amountOfCarsToGetIn = _.random(maxCarsIn / 2, maxCarsIn);
  const carsToGetOut = Object.keys(_DB[lot.id]).slice(0, MAX_OPERATION_PER_ROUND - amountOfCarsToGetIn);

  _executeTimes(amountOfCarsToGetIn)(() => enterCar(lot));
  carsToGetOut.forEach(exitCar(lot));
};

const refreshDb = lot => {
  const url = `${API_URL}/lots/${lot.id}/entries`;
  axios
    .get(url)
    .then(({ data }) => {
      log(`Refreshing ${lot.name} DB`);
      if (!_DB.hasOwnProperty(lot.id)) {
        _DB[lot.id] = {};
      }

      data.forEach(entry => {
        _DB[lot.id][entry.id] = moment(entry.enterTime);
      });

      run(lot);
    })
    .catch(data => {
      log(`GET ${url} caused an error`);
      console.log(data);
    });
};

log('About to let The Sims use your parking lots...');
log('Press CTRL+C to quit');
log('');

const interval = setInterval(() => {
  axios
    .get(`${API_URL}/lots`)
    .then(({ data }) => data.forEach(refreshDb))
    .catch(data => {
      log(data);
    });
}, ROUNDS_DELAY_IN_SECONDS * 1000);
