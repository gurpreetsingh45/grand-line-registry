// Starter data 
const crewMembers = [
  {
    id: 1,
    name: "Monkey D. Luffy",
    role: "Captain",
    bounty: 3000000000,
    devilFruit: "Hito Hito no Mi, Model: Nika",
    status: "active",
  },
  {
    id: 2,
    name: "Roronoa Zoro",
    role: "Swordsman",
    bounty: 1111000000,
    devilFruit: "None",
    status: "active",
  },
  {
    id: 3,
    name: "Nami",
    role: "Navigator",
    bounty: 366000000,
    devilFruit: "None",
    status: "active",
  },
  {
    id: 4,
    name: "Usopp",
    role: "Sniper",
    bounty: 500000000,
    devilFruit: "None",
    status: "active",
  },
  {
    id: 5,
    name: "Vinsmoke Sanji",
    role: "Cook",
    bounty: 1032000000,
    devilFruit: "None",
    status: "active",
  },
  {
    id: 6,
    name: "Tony Tony Chopper",
    role: "Doctor",
    bounty: 1000,
    devilFruit: "Hito Hito no Mi",
    status: "inactive",
  },
  {
    id: 7,
    name: "Nico Robin",
    role: "Archaeologist",
    bounty: 930000000,
    devilFruit: "Hana Hana no Mi",
    status: "active",
  },
  {
    id: 8,
    name: "Franky",
    role: "Shipwright",
    bounty: 394000000,
    devilFruit: "None",
    status: "active",
  },
  {
    id: 9,
    name: "Brook",
    role: "Musician",
    bounty: 383000000,
    devilFruit: "Yomi Yomi no Mi",
    status: "active",
  },
  {
    id: 10,
    name: "Jinbe",
    role: "Helmsman",
    bounty: 1100000000,
    devilFruit: "None",
    status: "active",
  },
];

const express = require('express');
const app = express();
const path = require('path');
const HTTP_PORT = process.env.HTTP_PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.listen(HTTP_PORT, () => {
    console.log(`app listening on port: ${HTTP_PORT}`);
});