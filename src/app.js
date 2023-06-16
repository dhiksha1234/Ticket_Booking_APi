"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import train as array  from './train.js';
const app = (0, express_1.default)();
const port = process.env.PORT || 3006;
var fs = require('fs');
app.use(express_1.default.json());
const trains = [
    { id: 1, train_no: "12", train_name: 'Jansathapthi Express', from: "cbe", to: "che", date: '14.3.2023', price: { AC: '1200', general: '700' }, seatAvailability: true },
    { id: 2, train_no: "72", train_name: 'Nagaercoil Express', from: "tbm", to: "tup", date: '16.6.2023', price: { AC: '1677', general: '790' }, seatAvailability: false },
    { id: 3, train_no: "92", train_name: 'Shatabdi Express', from: "che", to: "ed", date: '15.6.2023', price: { AC: '1577', general: '720' }, seatAvailability: true },
    { id: 4, train_no: "70", train_name: 'Mangalore Express', from: "che", to: "cbe", date: '17.6.2023', price: { AC: '8677', general: '740' }, seatAvailability: true },
    { id: 5, train_no: "00", train_name: 'Bangalore Express', from: "bgl", to: "cbe", date: '19.6.2023', price: { AC: '3677', general: '540' }, seatAvailability: true },
];
const passengers = [
    { id: 1, name: 'Dino', age: "24", gettingStation: "cbe", finalDestination: 'che', date: "16.6.2023", seatPreference: 'Window', needFood: 'yes', train_id: '' },
    { id: 2, name: 'Hoshi', age: "25", gettingStation: "che", finalDestination: 'tup', date: "17.6.2023", seatPreference: 'Window', needFood: 'yes', train_id: '' },
    { id: 3, name: 'Mingyu', age: "27", gettingStation: "tpr", finalDestination: 'ed', date: "16.6.2023", seatPreference: 'Window', needFood: 'yes', train_id: '' },
];
// home 
app.get('/', (req, res) => {
    res.send("Wecome to ticket booking API");
});
// list of trains
app.get('/trains', (req, res) => {
    res.send(trains);
});
//list of passengers
app.get('/passengers', (req, res) => {
    res.send(passengers);
});
// specific train based on train id 
app.get('/train/:id', function (req, res) {
    let train = trains.find(t => t.id === parseInt(req.params.id));
    res.send(train);
    if (!train) {
        res.send(404).send("No trains with that id");
    }
});
//adding the passenger in the list
app.post('/passengers', (req, res) => {
    const passenger = {
        id: passengers.length + 1,
        name: req.body.name,
        age: req.body.age,
        gettingStation: req.body.gettingStation,
        finalDestination: req.body.finalDestination,
        date: req.body.date,
        seatPreference: req.body.seatPreference,
        needFood: req.body.needFood,
        train_id: ''
    };
    passengers.push(passenger);
    res.send(passengers);
});
//gets train with the specific from and to destination
app.get('/train/:from/:to', (req, res) => {
    let fromPlace = trains.find(f => f.from === req.params.from && f.to === req.params.to);
    res.send(fromPlace);
});
// updated the train_id the passenger has booked
app.put('/passengers/:id', (req, res) => {
    let passenger = passengers.find(t => t.id === parseInt(req.params.id));
    if (!passenger) {
        res.send(404).send("No trains with that id");
        return;
    }
    passenger.train_id = req.body.train_id;
    res.send(passengers);
});
//delete a passenger
app.delete('/passengers/:id', (req, res) => {
    let passenger = passengers.find(t => t.id === parseInt(req.params.id));
    if (!passenger) {
        res.send(404).send("No trains with that id");
        return;
    }
    const index = passengers.indexOf(passenger);
    console.log(index);
    passengers.splice(index, 1);
    res.send(passengers);
});
app.listen(port, () => {
    console.log(`connected on ${port}`);
});
