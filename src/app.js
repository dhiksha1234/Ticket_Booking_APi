"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var data = require('./train.json');
const app = (0, express_1.default)();
const port = process.env.PORT || 3006;
var fs = require('fs');
app.use(express_1.default.json());
// home 
app.get('/', (req, res) => {
    res.send(data);
});
// list of trains
app.get('/trains', (req, res) => {
    res.send(data.trains);
});
//list of passengers
app.get('/passengers', (req, res) => {
    res.send(data.passengers);
});
// specific train based on train id 
app.get('/train/:id', function (req, res) {
    let train = data.trains.find((t) => t.id === parseInt(req.params.id));
    res.send(train);
    if (!train) {
        res.send(404).send("No trains with that id");
    }
});
//adding the passenger in the list
app.post('/passengers', (req, res) => {
    const passenger = {
        id: data.passengers.length + 1,
        name: req.body.name,
        age: req.body.age,
        gettingStation: req.body.gettingStation,
        finalDestination: req.body.finalDestination,
        date: req.body.date,
        seatPreference: req.body.seatPreference,
        needFood: req.body.needFood,
        train_id: ''
    };
    data.passengers.push(passenger);
    res.send(data.passengers);
});
//gets train with the specific from and to destination
app.get('/train/:from/:to', (req, res) => {
    let fromPlace = data.trains.find((f) => f.from === req.params.from && f.to === req.params.to);
    res.send(fromPlace);
});
// updated the train_id the passenger has booked
app.put('/passengers/:id', (req, res) => {
    let passenger = data.passengers.find((t) => t.id === parseInt(req.params.id));
    if (!passenger) {
        res.send(404).send("No passengers with that id");
        return;
    }
    passenger.balance = req.body.balance;
    res.send(data.passengers);
});
//delete a passenger
app.delete('/passengers/:id', (req, res) => {
    let passenger = data.passengers.find((t) => t.id === parseInt(req.params.id));
    if (!passenger) {
        res.send(404).send("No passengers with that id");
        return;
    }
    const index = data.passengers.indexOf(passenger);
    console.log(index);
    data.passengers.splice(index, 1);
    res.send(data.passengers);
});
app.listen(port, () => {
    console.log(`connected on ${port}`);
});
