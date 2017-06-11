'use strict';
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var Promise = require("bluebird");

var models = require("../models/models");
var rackModel = models.rackModel;

function getRack(params) {
    return new Promise(function (resolve, reject) {
        var query = params.query || {};
        if (params.rack_id) {
            query.rack_id = params.rack_id
        }
        rackModel.find(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

function setRack(params) {
    return new Promise(function (resolve, reject) {
        var rackObj = {
            rack_id: Math.random().toString(36).slice(2),
            name: params.name,
            building: params.building,
            floor: params.floor,
            location: params.location,
            data_center_id: params.data_center_id
        }
        rackModel.update({rack_id: rackObj.rack_id}, {$set: rackObj}, {upsert: true}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}

function updateRack(params) {

    return new Promise(function (resolve, reject) {
        var findQuery = {};
        if (params.rack_id) {
            findQuery.rack_id = params.rack_id;
        } else {
            return reject(new Error("rack_id is mandatory to update"));
        }

        var setObj = {};
        if (params.name) {
            setObj.name = params.name
        }
        if (params.building) {
            setObj.building = params.building
        }

        if (params.floor) {
            setObj.floor = params.floor
        }
        if (params.location) {
            setObj.location = params.location
        }
        if (params.data_center_id) {
            setObj.data_center_id = params.data_center_id
        }


        rackModel.update(findQuery, {$set: setObj}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
function deleteRack(params) {

    return new Promise(function (resolve, reject) {
        var query = {};
        if (params.rack_id) {
            query.rack_id = params.rack_id;
        } else {
            return reject(new Error("rack_id is mandatory to delete"));
        }

        rackModel.remove(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}

function listOfRacks(params) {
    return new Promise(function (resolve, reject) {
        var query = {};
        if (params.data_center_id) {
            query.data_center_id = params.data_center_id;
        } else {
            return reject(new Error("data_center_id is mandatory to delete"));
        }
        rackModel.find(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
module.exports = {
    getRack: getRack,
    setRack: setRack,
    updateRack: updateRack,
    deleteRack: deleteRack,
    listOfrack: listOfRacks
};