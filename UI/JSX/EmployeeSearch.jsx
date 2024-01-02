import React from 'react';

export default class EmployeeSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }
  handleChange = (e) => {
    this.props.onFilterChange(e.target.value);
  };

  handleFilterClick(){
    this.props.onFilterClick();
  };

  render() {
    const searchStyle = {
      borderBottom: '1px solid black',
      paddingBottom: '10px',
      marginTop: '25px',
      marginLeft: '5px',
    };

    const selectStyle = {
      width: '20%',
      padding: '0.7%',
      marginBottom: '1%',
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

    return (
      <div style={searchStyle}>
        <select name="title" style={selectStyle} value={this.props.selectedFilter} onChange={this.handleChange}>
          <option value="" disabled>Select to filter employees</option>
          <option value="AllEmployee">All Employees</option>
          <option value="FullTime">FullTime Employees</option>
          <option value="PartTime">PartTime Employees</option>
          <option value="Contract">Contract Employees</option>
          <option value="Seasonal">Seasonal Employees</option>
        </select>
        <input style={buttonStyle} type="button" value={'Filter'} onClick={this.handleFilterClick} />
      </div>
    );
  }
}
