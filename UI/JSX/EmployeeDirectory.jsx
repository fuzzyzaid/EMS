import React from 'react';

import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";

export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employees: [], selectedFilter: 'AllEmployee' };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    let query;
    try {
      if (this.state.selectedFilter === 'AllEmployee') {
        query = `query {
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
      } else {
        query = `query {
          employeesListFilter(filter: { employeeType: "${this.state.selectedFilter}" }) {
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
      }
  
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
  
      const result = await response.json();
      this.setState({ employees: result.data[this.state.selectedFilter === 'AllEmployee' ? 'employeesList' : 'employeesListFilter'] });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  

  handleFilterChange = (selectedFilter) => {
    this.setState({ selectedFilter });
  };

  handleFilterClick = () => {
    this.loadData();
  };

  handleEmployeeDeleted = (deletedEmployeeId) => {
    const updatedEmployees = this.state.employees.filter(employee => employee.id !== deletedEmployeeId);
    this.setState({ employees: updatedEmployees });
  };

  render() {
    const containerStyle = {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    };

    const footerStyle = {
      backgroundColor: '#003b49',
      color: '#d0d3d4',
      textAlign: 'center',
      padding: '20px',
      fontSize: '1rem',
    };

    return (
      <div>
        <div>
          <EmployeeSearch
            onFilterChange={this.handleFilterChange}
            onFilterClick={this.handleFilterClick}
            selectedFilter={this.state.selectedFilter}
          />
          <EmployeeTable  style={containerStyle}
          allEmployees={this.state.employees}
          onEmployeeDeleted={this.handleEmployeeDeleted} />
        </div>
        <footer style={footerStyle}>&copy; Zaid Alam</footer>
      </div>
    );
  }
}
