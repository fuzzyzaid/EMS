import React from 'react';
class EmployeeSearch extends React.Component {
  render() {
    const searchStyle = {
      borderBottom: '1px solid black',
      paddingBottom: '10px',
      marginTop: '25px',
      marginLeft: '5px'
    };
    const inputStyle = {
      width: '20%',
      padding: '0.7%',
      marginBottom: '1%',
      marginRight: '2%',
      border: '1px solid #d0d3d4',
      borderRadius: '5px',
      fontSize: '1rem'
    };
    const buttonStyle = {
      backgroundColor: '#003b49',
      color: '#d0d3d4',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.2rem'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: searchStyle
    }, /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      placeholder: "Search For Employee"
    }), /*#__PURE__*/React.createElement("input", {
      style: buttonStyle,
      type: "button",
      value: 'Filter'
    }), /*#__PURE__*/React.createElement("p", null, "Note: It will be implemented in the next Assignment as per the instructions"));
  }
}
class EmployeeRow extends React.Component {
  render() {
    const rowStyle = {
      border: '1px solid #d0d3d4',
      padding: '10px',
      textAlign: 'left'
    };
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.firstName), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.lastName), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.age), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.dateOfJoining), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.title), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.department), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.employeeType), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, this.props.rowEmployee.currentStatus));
  }
}
class EmployeeTable extends React.Component {
  render() {
    const divStyle = {
      borderBottom: '1px solid black',
      paddingBottom: '10px'
    };
    const headingStyle = {
      color: '#003b49',
      marginLeft: '8px'
    };
    const tableStyle = {
      borderCollapse: 'collapse',
      width: '80%',
      margin: '20px',
      border: '1px solid #d0d3d4'
    };
    const headerStyle = {
      border: '1px solid #d0d3d4',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#003b49',
      color: '#d0d3d4'
    };
    const employees = this.props.allEmployees.map(item => /*#__PURE__*/React.createElement(EmployeeRow, {
      key: item.id,
      rowEmployee: item
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: divStyle
    }, /*#__PURE__*/React.createElement("h2", {
      style: headingStyle
    }, "List of All Employees"), /*#__PURE__*/React.createElement("table", {
      style: tableStyle
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "First Name"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Last Name"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Age"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Date Of Joining"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Title"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Department"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Employee Type"), /*#__PURE__*/React.createElement("th", {
      style: headerStyle
    }, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, employees)));
  }
}
class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: '',
      department: '',
      employeeType: '',
      errors: {} // to keep all the errors while validating the inputs
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.validateForm()) {
      const {
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType
      } = this.state; // destructuring the state value if there is no error
      const emp = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: parseInt(age),
        dateOfJoining: dateOfJoining.trim(),
        title: title.trim(),
        department: department.trim(),
        employeeType: employeeType.trim(),
        currentStatus: "1"
      };
      this.props.createEmployee(emp);
      this.setState({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
        errors: {}
      });
    }
  };
  validateForm() {
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType
    } = this.state;
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First Name is required.';
    } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(firstName)) {
      errors.firstName = 'First Name must contain only alphabetic characters.';
    }
    if (!lastName) {
      errors.lastName = 'Last Name is required.';
    } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(lastName)) {
      errors.lastName = 'Last Name must contain only alphabetic characters.';
    }
    if (!age) {
      errors.age = 'Age is required.';
    } else if (age < 20 || age > 70) {
      errors.age = 'Age must be between 20 and 70.';
    }
    if (!dateOfJoining) {
      errors.dateOfJoining = 'Date of Joining is required.';
    }
    if (!title) {
      errors.title = 'Title is required.';
    }
    if (!department) {
      errors.department = 'Department is required.';
    }
    if (!employeeType) {
      errors.employeeType = 'Employee Type is required.';
    }
    this.setState({
      errors
    });
    return Object.keys(errors).length === 0;
  }
  handleChange = e => {
    const {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const {
      errors
    } = this.state;
    const createStyle = {
      marginTop: '1%',
      borderBottom: '1px solid black'
    };
    const headingStyle = {
      color: '#003b49',
      marginLeft: '8px'
    };
    const formStyle = {
      maxWidth: '500px',
      marginLeft: '20%',
      paddingBottom: '20px'
    };
    const inputStyle = {
      width: '100%',
      padding: '1%',
      marginBottom: '5%',
      marginRight: '2%',
      border: '1px solid #d0d3d4',
      borderRadius: '5px',
      fontSize: '1rem'
    };
    const buttonStyle = {
      backgroundColor: '#003b49',
      color: '#d0d3d4',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.2rem'
    };
    const erroStyle = {
      color: 'red',
      marginTop: '-15px',
      fontSize: '1rem'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: createStyle
    }, /*#__PURE__*/React.createElement("h2", {
      style: headingStyle
    }, "Add Employee"), /*#__PURE__*/React.createElement("form", {
      style: formStyle,
      name: "AddEmployee",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      style: inputStyle,
      value: this.state.firstName,
      onChange: this.handleChange
    }), errors.firstName && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.firstName), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      style: inputStyle,
      value: this.state.lastName,
      onChange: this.handleChange
    }), errors.lastName && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.lastName), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "age",
      placeholder: "Age",
      style: inputStyle,
      value: this.state.age,
      onChange: this.handleChange
    }), errors.age && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.age), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "dateOfJoining",
      placeholder: "Date Of Joining",
      style: inputStyle,
      value: this.state.dateOfJoining,
      onChange: this.handleChange
    }), errors.dateOfJoining && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.dateOfJoining), /*#__PURE__*/React.createElement("select", {
      name: "title",
      style: inputStyle,
      value: this.state.title,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select Title"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director")), errors.title && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.title), /*#__PURE__*/React.createElement("select", {
      name: "department",
      style: inputStyle,
      value: this.state.department,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select Department"), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")), errors.department && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.department), /*#__PURE__*/React.createElement("select", {
      name: "employeeType",
      style: inputStyle,
      value: this.state.employeeType,
      onChange: this.handleChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true
    }, "Select Employee Type"), /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")), errors.employeeType && /*#__PURE__*/React.createElement("p", {
      className: "errorMsg",
      style: erroStyle
    }, errors.employeeType), /*#__PURE__*/React.createElement("button", {
      style: buttonStyle,
      onClick: this.handleSubmit
    }, "Create")));
  }
}
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const query = `query {
        employeesList {
          id
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    await this.setState({
      employees: result.data.employeesList
    });
  }
  createEmployee = emp => {
    const mylist = this.state.employees.slice();
    mylist.push(emp);
    this.setState({
      employees: mylist
    });
  };
  insertEmployee = async emp => {
    const query = `mutation AddEmployee($employee: EmployeeInputs!) {
          addEmployee(employee: $employee) {
            id
          }
        }`;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: {
          employee: emp
        }
      })
    });
    this.loadData();
  };
  render() {
    const containerStyle = {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    };
    const headerStyle = {
      backgroundColor: '#003b49',
      color: '#d0d3d4',
      textAlign: 'center',
      padding: '10px'
    };
    const footerStyle = {
      backgroundColor: '#003b49',
      color: '#d0d3d4',
      textAlign: 'center',
      padding: '20px',
      fontSize: '1rem'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
      style: headerStyle
    }, /*#__PURE__*/React.createElement("h1", null, "Employee Management System")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
      style: containerStyle,
      allEmployees: this.state.employees
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      createEmployee: this.insertEmployee
    })), /*#__PURE__*/React.createElement("footer", {
      style: footerStyle
    }, "\xA9 Zaid Alam"));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById('contents'));