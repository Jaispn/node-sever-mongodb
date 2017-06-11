/**
 * Created by jai on 10/06/17.
 */
'use strict';

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');

var dataCenterModel = mongoose.model("datacenter", mongoose.Schema({
    name: String,
    address: String,
    city: String,
    zip: Number,
    buildings: String,
    dc_id: String
}));
var rackModel = mongoose.model("rack", mongoose.Schema({
    name: String,
    building: String,
    floor: String,
    location: String,
    data_center_id: String,
    rack_id: String
}));
var devicesModel = mongoose.model("devices", mongoose.Schema({
    device_name: String,
    type: String,
    mac_address: String,
    unit_size: Number,
    rack_id: String,
    data_center_id: String,
    devices_id: String
}));
module.exports = {
    dataCenterModel: dataCenterModel,
    devicesModel: devicesModel,
    rackModel: rackModel
}