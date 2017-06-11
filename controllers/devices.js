'use strict';
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var Promise = require("bluebird");

var models = require("../models/models");
var devicesModel = models.devicesModel;

function getDevices(params) {
    return new Promise(function (resolve, reject) {
        var query = params.query || {};
        if (params.name) {
            query.name = params.name
        }
        if (params.devices_id) {
            query.devices_id = params.devices_id
        }
        devicesModel.find(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

function setDevices(params) {
    return new Promise(function (resolve, reject) {
        var devicesObj = {
            devices_id: Math.random().toString(36).slice(2),
            device_name: params.name,
            type: params.type,
            mac_address: params.mac_address,
            unit_size: params.unit_size,
            rack_id: params.rack_id,
            data_center_id: params.data_center_id
        };
        devicesModel.update({devices_id: devicesObj.devices_id}, {$set: devicesObj}, {upsert: true}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}

function updateDevices(params) {

    return new Promise(function (resolve, reject) {
        var findQuery = {};
        if (params.devices_id) {
            findQuery.devices_id = params.devices_id;
        } else {
            return reject(new Error("DC_ID is mandatory to update"));
        }

        var setObj = {};
        if (params.name) {
            setObj.device_name = params.name
        }
        if (params.city) {
            setObj.type = params.type
        }

        if (params.mac_address) {
            setObj.mac_address = params.mac_address
        }
        if (params.unit_size) {
            setObj.unit_size = params.unit_size
        }


        devicesModel.update(findQuery, {$set: setObj}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
function deleteDevices(params) {

    return new Promise(function (resolve, reject) {
        var query = {};
        if (params.devices_id) {
            query.devices_id = params.devices_id;
        } else {
            return reject(new Error("devices_id is mandatory to delete"));
        }

        devicesModel.remove(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}

function listOfDevices(params) {
    return new Promise(function (resolve, reject) {
        var query = params.query || {};
        if (params.data_center_id) {
            query.data_center_id = params.data_center_id
        }
        console.log("Query==>", query);
        devicesModel.find(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
module.exports = {
    getDevices: getDevices,
    setDevices: setDevices,
    updateDevices: updateDevices,
    deleteDevices: deleteDevices,
    listOfDevices: listOfDevices

};