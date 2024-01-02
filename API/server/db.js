const mongoose = require('mongoose');
const Employee = require('../models/employee');

const db_url = 'mongodb+srv://zaidalam0731:zaid@cluster0.s71ckpw.mongodb.net/EmployeeManagementSystem?retryWrites=true&w=majority';

async function ConnectTodb() {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the Database');
  } catch (connErr) {
    console.error(connErr);
  }
}

async function getEmployeesList() {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (error) {
    console.error(error);
  }
}

async function getEmployeesListFilter(filter) {
  try {
    const employees = await Employee.find(filter);
    return employees;
  } catch (error) {
    console.error(error);
  }
}

async function addEmployee(emp) {
  try {
    const savedEmployee = await Employee.create(emp);
    return savedEmployee;
  } catch (error) {
    console.error(error);
  }
}

async function getEmployeeDetails(id) {
  try {
    const employee = await Employee.findOne({_id:id});
    return employee;
  } catch (error) {
    console.error(error);
  }
}

async function updateEmployee(id, input) {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate({_id:id}, input, { new: true });
    return updatedEmployee;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
}


async function deleteEmployee(id) {
  try {
    const result = await Employee.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
}



module.exports = { ConnectTodb, getEmployeesList, getEmployeesListFilter, addEmployee,deleteEmployee, getEmployeeDetails,updateEmployee};
