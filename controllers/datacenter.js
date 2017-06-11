'use strict';
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var Promise = require("bluebird");

var models = require("../models/models");

function getDataCenter(params) {
    return new Promise(function (resolve, reject) {
        var dataCenterModel = models.dataCenterModel;
        var query = params.query || {};
        if(params.name){
            query.name = params.name
        }
        if(params.city){
            query.city = params.city
        }
        if(params.dc_id){
            query.dc_id = params.dc_id
        }
        dataCenterModel.find(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

function setDataCenter(params) {
    return new Promise(function (resolve, reject) {
        var dataCenterModel = models.dataCenterModel;
        var dcObj = {
            dc_id: Math.random().toString(36).slice(2),
            name : params.name,
            address: params.address,
            city: params.city,
            zip: params.zip,
            buildings: params.buildings
        }
        dataCenterModel.update({dc_id:dcObj.id},{$set:dcObj}, {upsert:true}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}

function updateDataCenter(params) {

    return new Promise(function (resolve, reject) {
        var dataCenterModel = models.dataCenterModel;
        var findQuery = {};
        if(params.dc_id){
            findQuery.dc_id = params.dc_id;
        }else{
            return reject(new Error("DC_ID is mandatory to update"));
        }

        var setObj = {};
        if(params.name){
            setObj.name = params.name
        }
        if(params.city){
            setObj.city = params.city
        }

        if(params.address){
            setObj.address = params.address
        }
        if(params.zip){
            setObj.zip = params.zip
        }
        if(params.buildings){
            setObj.buildings = params.buildings
        }


        dataCenterModel.update(findQuery,{$set:setObj}).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
function deleteDataCenter(params) {

    return new Promise(function (resolve, reject) {
        var dataCenterModel = models.dataCenterModel;
        var query = {};
        if(params.dc_id){
            query.dc_id = params.dc_id;
        }else{
            return reject(new Error("DC_ID is mandatory to delete"));
        }

        dataCenterModel.remove(query).exec(function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

}
module.exports = {
    getDataCenter: getDataCenter,
    setDataCenter: setDataCenter,
    updateDataCenter: updateDataCenter,
    deleteDataCenter: deleteDataCenter
};