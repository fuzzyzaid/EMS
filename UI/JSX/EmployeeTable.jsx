import React from 'react';

import EmployeeRow from "./EmployeeRow.jsx";

export default class EmployeeTable extends React.Component {
    render() {
      const divStyle = {
        borderBottom: '1px solid black',
        paddingBottom: '10px',
      };
      const headingStyle={
        color:'#003b49',
        marginLeft:'8px',
      }
  
      const tableStyle = {
        borderCollapse: 'collapse',
        width: '80%',
        margin: '20px',
        border: '1px solid #d0d3d4',
      };
  
      const headerStyle = {
        border: '1px solid #d0d3d4',
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#003b49',
        color: '#d0d3d4',
      };
  
      const employees = this.props.allEmployees.map((item) => <EmployeeRow key={item.id} rowEmployee={item} onEmployeeDeleted={this.props.onEmployeeDeleted} />);
  
      return (
        <div style={divStyle}>
          <h2 style={headingStyle}>List of All Employees</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>First Name</th>
                <th style={headerStyle}>Last Name</th>
                <th style={headerStyle}>Age</th>
                <th style={headerStyle}>Date Of Joining</th>
                <th style={headerStyle}>Title</th>
                <th style={headerStyle}>Department</th>
                <th style={headerStyle}>Employee Type</th>
                <th style={headerStyle}>Current Status</th>
                <th style={headerStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>{employees}</tbody>
          </table>
        </div>
      );
    }
  }