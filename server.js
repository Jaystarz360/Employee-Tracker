const fs = require("fs/promises");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const { pause, addDeptQuest, viewBudgetQuest } = require("./util/questions");

const {
  addRoleQuest,
  addEmpQuest,
  updEmpRoleQuest,
  question,
  whichDeptQuest,
} = require("./util/questions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Nightlife001!",
      database: "emp_track_db",
    },
    console.log(`Connected to the employees_db database.`)
  );