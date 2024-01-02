import React from 'react';
import {Routes,Route, NavLink}  from 'react-router-dom';
import NavLinks from './navigation.jsx';


const navBarStyle = {
    background: '#003b49',
    padding: '10px',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center'   
  };
  
  const navLinkStyle = {
    color: '#d0d3d4',
  textDecoration: 'none',
  margin: '0 10px',
  };
  

function NavBar(){
   return (
    <nav style={navBarStyle}>
        <NavLink to='/' style={navLinkStyle} >Home    |</NavLink>
        <NavLink to='/EmployeeCreate' style={navLinkStyle} >Add Employee    |</NavLink>
    </nav>
   )
}


export default class Home extends React.Component {
    render() {
        const headerStyle = {
            backgroundColor: '#003b49',
            color: '#d0d3d4',
            textAlign: 'center',
            padding: '10px',
          };
  
      return (
           <div>
                     <header style={headerStyle}>
                        <h1>Employee Management System</h1>
                    </header>
                    <NavBar />
                    <NavLinks />
           </div>
      )
    }
  }