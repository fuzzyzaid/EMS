const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ConnectTodb, getEmployeesList,getEmployeesListFilter, addEmployee,deleteEmployee ,getEmployeeDetails,updateEmployee} = require('./db');
const path = require('path');
const fs=require('fs');
const graphql = require("graphql");
require('dotenv').config();

const app = express();

let aboutMsg = 'Hello, this is Employee Management System';

const resolvers = {
  Query: {
    about: getMessage,
    employeesList: getEmployees,
    employeesListFilter:employeesListFilterIndex,
    employeeById: getEmployeeDetailsIndex,
    
  },
  Mutation: {
    setAboutMessage,
    addEmployee: addNewEmployee,
    deleteEmployee: deleteEmployeeById,
    updateEmployee:updateEmployeeIndex
  },
};

function getMessage() {
  return aboutMsg;
}

function setAboutMessage(_, { message }) {
  aboutMsg = message;
  return aboutMsg;
}

function getEmployees() {
  return getEmployeesList();
}

async function employeesListFilterIndex(_, { filter }) {
  const employees = await getEmployeesListFilter(filter);
  return employees;
}

async function getEmployeeDetailsIndex(_, { id }) {
  const employees = await getEmployeeDetails(id);
  return employees;
}

async function addNewEmployee(_, { employee }) {
  try {
    addEmployee(employee);
    return employee;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateEmployeeIndex(_, { id,input }) {
  const employees = await updateEmployee(id,input);
  return employees;
}

async function deleteEmployeeById(_, { id }) {
  try {
    const success = await deleteEmployee(id);
    return success;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}


const server = new ApolloServer({typeDefs:fs.readFileSync('./server/schema.graphql','utf-8'),resolvers});
server.start().then(async () => {
  await ConnectTodb();
  server.applyMiddleware({ app, path: '/graphql',});

  app.listen(process.env.API_PORT, () => {
    console.log(`API Server started at port ${process.env.API_PORT}`);
  });
});
