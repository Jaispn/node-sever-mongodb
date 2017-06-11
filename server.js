/**
 * Created by jai on 10/06/17.
 */
const express = require('express');
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

var dataCenterUtils = require("./controllers/datacenter");
var rackUtils = require("./controllers/rack");
var devicesUtils = require("./controllers/devices");


//All api can be moved to routes as well. It will make is more modular
server.get("/get-data-center", function (req, res) {
    dataCenterUtils.getDataCenter(req.query)
        .then(function (result) {
            console.log("data center found")
            res.send({data: result});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });
});
server.post("/create-data-center", function (req, res) {
    dataCenterUtils.setDataCenter(req.body)
        .then(function (result) {
            console.log("data center created");
            res.send({message: "Successfully created datacenter"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/update-data-center", function (req, res) {

    dataCenterUtils.updateDataCenter(req.body)
        .then(function (result) {
            console.log("data center created");
            res.send({message: "Successfully updated datacenter"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/delete-data-center", function (req, res) {

    dataCenterUtils.deleteDataCenter(req.body)
        .then(function (result) {
            console.log("data center created");
            res.send({message: "Successfully deleted datacenter"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.get("/get-rack", function (req, res) {
    rackUtils.getRack(req.query)
        .then(function (result) {
            console.log("rack found");
            res.send({data: result});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });
});
server.post("/create-rack", function (req, res) {
    rackUtils.setRack(req.body)
        .then(function (result) {
            console.log("rack created");
            res.send({message: "Successfully created Rack"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/update-rack", function (req, res) {
    rackUtils.updateRack(req.body)
        .then(function (result) {
            console.log("rack updated");
            res.send({message: "Successfully updated Rack"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/delete-rack", function (req, res) {
    rackUtils.deleteRack(req.body)
        .then(function (result) {
            console.log("rack created");
            res.send({message: "Successfully deleted rack"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.get("/get-devices", function (req, res) {
    devicesUtils.getDevices(req.query)
        .then(function (result) {
            console.log("devices found")
            res.send({data: result});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });
});
server.post("/create-devices", function (req, res) {
    devicesUtils.setDevices(req.body)
        .then(function (result) {
            console.log("data center created");
            res.send({message: "Successfully created datacenter"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/update-devices", function (req, res) {
    devicesUtils.updateDevices(req.body)
        .then(function (result) {
            console.log("data center created");
            res.send({message: "Successfully updated datacenter"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.post("/delete-devices", function (req, res) {
    devicesUtils.deleteDevices(req.body)
        .then(function (result) {
            console.log("devices created");
            res.send({message: "Successfully deleted devices"});

        })
        .catch(function (err) {
            console.log(err);
            res.send({error: 500, error_message: "Not data found"})
        });

});
server.get("/list-of-rack", function (req,res) {
    rackUtils.listOfrack(req.query)
        .then(function (result) {
           return res.send({data: result})
        })
        .catch(function (err) {
            console.log("Error", err);
            return res.send({statusCode: 500, error_message: "Not able to get list of racks"})
        })
})

server.get("/list-of-devices", function (req,res) {
    devicesUtils.listOfDevices(req.query)
        .then(function (result) {
            return res.send({data: result})
        })
        .catch(function (err) {
            console.log("Error", err);
            return res.send({statusCode: 500, error_message: "Not able to get list of racks"})
        })

})

server.use(function (err, req, res, next) {
    console.log(err.stack);
// TODO report error here or do some further handlings
    res.status(500).send("something went wrong...")
});
console.log("Server is listening to port: ", port);
server.listen(port);