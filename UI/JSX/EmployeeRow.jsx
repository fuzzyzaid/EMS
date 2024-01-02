import React from 'react';
import { Link } from 'react-router-dom';

export default class EmployeeRow extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

 async handleDelete() {
    const id=this.props.rowEmployee.id;
    
    const query = `
      mutation {
        deleteEmployee(id: "${id}")
      }
    `;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query }),
    });

    const result = await response.json();

    if (result.data.deleteEmployee) {
      this.props.onEmployeeDeleted(id);
      window.alert('Employee deleted successfully');
    } else {
      console.error('Error deleting employee');
    }
  }

  render() {
    const employeeId = this.props.rowEmployee.id;

    const rowStyle = {
      border: '1px solid #d0d3d4',
      padding: '10px',
      textAlign: 'left',
    };

    const buttonStyle = {
      padding: '5px 10px',
      marginRight: '5px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    };

    const linkStyle = {
      color: '#3498db',
      textDecoration: 'none',
      marginRight: '1rem'
    };

    return (
      <tr>
        <td style={rowStyle}>{this.props.rowEmployee.firstName}</td>
        <td style={rowStyle}>{this.props.rowEmployee.lastName}</td>
        <td style={rowStyle}>{this.props.rowEmployee.age}</td>
        <td style={rowStyle}>{this.props.rowEmployee.dateOfJoining}</td>
        <td style={rowStyle}>{this.props.rowEmployee.title}</td>
        <td style={rowStyle}>{this.props.rowEmployee.department}</td>
        <td style={rowStyle}>{this.props.rowEmployee.employeeType}</td>
        <td style={rowStyle}>{this.props.rowEmployee.currentStatus}</td>
        <td style={rowStyle}>
          <a href={`#/EmployeeEdit/${employeeId}`} style={linkStyle}>Edit</a>
          <button style={buttonStyle} onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}
