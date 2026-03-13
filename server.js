/********************************************************************************
* WEB322-Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Gurpreet Singh Student ID: 143124246 Date: 13-03-2026
*
********************************************************************************/
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

const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.HTTP_PORT || 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
// 2.1 Request logger
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"];
  const logString = `Request from: ${userAgent} at ${new Date()}`;
  console.log(logString);
  req.log = logString;
  // console.log(req.log);
  next();
});

// 2.2 Route-Restricting Middleware (to be applied on GET- /logpose route only)
function verifyBounty(req, res, next) {
  const allowed = Math.floor(Math.random() * 2);
  if (allowed === 1) {
    next();
  } else {
    res
      .status(403)
      .send(`403 - The Marines have blocked your path. Turn back.`);
  }
}

app.get("/", (req, res) => {
  res.render("index.ejs", {
    page: "The Crew",
    memberData: crewMembers,
  });
});

app.get("/crew", (req, res) => {
  res.render("crew.ejs", {
    page: "Crew Roster",
    memberData: crewMembers,
  });
});

app.get("/recruit", (req, res) => {
  res.render("recruit.ejs", {
    page: "Join the Crew",
  });
});

// form submission (server side validation)
app.post("/recruit", (req, res) => {
  const { applicantName, skill, role, message, sea, agreeTerms } = req.body;
  const errors = [];

  if (!applicantName || !applicantName.trim()) errors.push("Name is required.");
  if (!skill || !skill.trim()) errors.push("Special skill is required.");
  if (!role || role === "Select a role") errors.push("Please select a desired role.");
  if (!message || !message.trim()) errors.push("Message is required.");
  if (!sea) errors.push("Please select a preferred sea.");
  if (!agreeTerms) errors.push("You must agree to the risks of the Grand Line.");

  if (errors.length > 0) {
    return res.render("recruit.ejs", {
      page: "Join the Crew",
      errors,
    });
  }

  crewMembers.push({
    id: crewMembers.length + 1,
    name: applicantName.trim(),
    role: role,
    bounty: 0,
    devilFruit: "Unknown",
    status: "pending",
  });

  res.render("recruit.ejs", {
    page: "Join the Crew",
    success: true,
  });
});

app.get("/log-pose", verifyBounty, (req, res) => {
  res.render("logPose.ejs", {
    page: "Secret Log Pose",
    crew: crewMembers,
    log: req.log,
  });
});

// Error-Handler test
app.get("/error-test", (req, res) => {
  throw Error("Engine Malfunction!");
});

// 2.3 404 Handler
app.use((req, res, next) => {
  res.render("404.ejs", {
    err: "404 - We couldn't find what you're looking for on the Grand Line.",
  });
});

// 2.4 Error-Handling Middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .send(`500 - Something went wrong on the Thousand Sunny: ${err.message}`);
});

app.listen(HTTP_PORT, () => {
  console.log(`app listening on port: ${HTTP_PORT}`);
});
