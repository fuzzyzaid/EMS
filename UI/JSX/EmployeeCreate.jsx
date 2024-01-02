import React from 'react';


export default class EmployeeCreate extends React.Component {
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
        errors: {}, 
      };
    }
  
    handleSubmit = (e) => {
      e.preventDefault();

      if (this.validateForm()) {
        const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = this.state; 
        const emp = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          age: parseInt(age),
          dateOfJoining: dateOfJoining.trim(),
          title: title.trim(),
          department: department.trim(),
          employeeType: employeeType.trim(),
          currentStatus: "1",
        };
        this.insertEmployee(emp);

        this.setState({
          firstName: '',
          lastName: '',
          age: '',
          dateOfJoining: '',
          title: '',
          department: '',
          employeeType: '',
          errors: {},
        });
      }
    };

    validateForm() {
      const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = this.state;
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
  
      this.setState({ errors });
      return Object.keys(errors).length === 0;
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    insertEmployee = async (emp) =>{
      const query = `mutation AddEmployee($employee: EmployeeInputs!) {
        addEmployee(employee: $employee) {
          id
        }
      }`;
  
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, variables: { employee: emp } }),
      });
      if(response){
        window.alert('Employee created successfully');
      }
  
    }
  
    render() {
      const { errors } = this.state;
      const createStyle = {
        marginTop: '1%',
        borderBottom: '1px solid black',
      };
      const headingStyle={
        color:'#003b49',
        marginLeft:'8px',
      }
  
      const formStyle = {
        maxWidth: '500px',
        marginLeft: '20%',
        paddingBottom:'20px',
      };
      const inputStyle = {
        width: '100%',
        padding: '1%',
        marginBottom: '5%',
        marginRight: '2%',
        border: '1px solid #d0d3d4',
        borderRadius: '5px',
        fontSize: '1rem',
      };
  
      const buttonStyle = {
        backgroundColor: '#003b49',
        color: '#d0d3d4',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem',
      };

      const erroStyle={
        color: 'red',
        marginTop: '-15px',
        fontSize: '1rem',
      }
  
      return (
        <div style={createStyle}>
          <h2 style={headingStyle}>Add Employee</h2>
          <form style={formStyle} name="AddEmployee" onSubmit={this.handleSubmit}>

            <input type="text" name="firstName" placeholder="First Name" style={inputStyle} 
                   value={this.state.firstName} onChange={this.handleChange}/>
            {errors.firstName && <p className="errorMsg" style={erroStyle}>{errors.firstName}</p>}

            <input type="text" name="lastName" placeholder="Last Name" style={inputStyle} 
                   value={this.state.lastName} onChange={this.handleChange} />
            {errors.lastName&& <p className="errorMsg" style={erroStyle}>{errors.lastName}</p>}

            <input type="number" name="age" placeholder="Age" style={inputStyle}  
                   value={this.state.age} onChange={this.handleChange} />
            {errors.age && <p className="errorMsg" style={erroStyle}>{errors.age}</p>}

            <input type="date" name="dateOfJoining" placeholder="Date Of Joining" style={inputStyle}  
                   value={this.state.dateOfJoining} onChange={this.handleChange} />
            {errors.dateOfJoining && <p className="errorMsg" style={erroStyle}>{errors.dateOfJoining}</p>}

            <select name="title" style={inputStyle}  value={this.state.title} onChange={this.handleChange} >
              <option value="" disabled >Select Title</option>
              <option value="Employee">Employee</option>
              <option value="VP">VP</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
            </select>
            {errors.title && <p className="errorMsg" style={erroStyle}>{errors.title}</p>}

            <select name="department" style={inputStyle}  value={this.state.department} onChange={this.handleChange} >
              <option value="" disabled >Select Department</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
            {errors.department && <p className="errorMsg" style={erroStyle}>{errors.department}</p>}
            
            <select name="employeeType" style={inputStyle}  value={this.state.employeeType} onChange={this.handleChange}>
              <option value="" disabled >Select Employee Type</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
            {errors.employeeType && <p className="errorMsg" style={erroStyle}>{errors.employeeType}</p>}

            <button style={buttonStyle} onClick={this.handleSubmit}>Create</button>
          </form>
        </div>
      );
    }
  }